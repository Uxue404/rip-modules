import {Box, Text} from "ink";
import {MultiSelect} from "@inkjs/ui";
import type {ScanResult} from "../types";
import {basename, dirname} from "path";
import {deleteNodeModules} from "../utils/deleter.ts";
import {useRef, useState} from "react";

interface ListProps {
    results: ScanResult[];
    onDelete: (selected: string[]) => void;
}
const toGB = (bytes: number) =>
    (bytes / 1024 / 1024 / 1024).toFixed(2);

const List= ({results, onDelete}: ListProps) => {
    const [message, setMessage] = useState<{type: "success" | "error", text: string} | null>(null);

    const isSubmitting = useRef(false); // 👈 agrega esto

    const options = results.map((r, i) => ({
        label: `${basename(dirname(r.path))} - ${toGB(r.size)} GB`,
        value: String(i)
    }));

    return (
        <Box flexDirection='column'
             minWidth={50}
             padding={1}
             gap={1}>
            <MultiSelect
                options={options}
                onChange={() => {
                    if (isSubmitting.current) return
                    setMessage(null)
                }}
                onSubmit={(values) => {
                    isSubmitting.current = true;

                    if (values.length < 1) {
                        setMessage({ type: "error", text: "No modules selected" });
                        setTimeout(() => {
                            isSubmitting.current = false;
                        }, 100)
                        return
                    }

                    const selected = values
                        .map((v) => results[Number(v)])
                        .filter((r) => r !== undefined)

                    const pathSelected = selected.map((r) => r.path)
                    const sizeSelected = selected.map((r) => r.size)

                    const totalDeleted = sizeSelected.reduce((acc, size) => acc + size, 0);
                    const size = toGB(totalDeleted);

                    setMessage({ type: "success", text: `Deleted ${selected.length} modules (${size} GB freed)` });
                    deleteNodeModules(pathSelected);
                    onDelete(pathSelected);
                    setTimeout(() => {
                        isSubmitting.current = false;
                    }, 100)
                }}>
            </MultiSelect>
            {message && (
                <Box>
                    {message.type === "error" ? (
                        <Text color="yellow">⚠️  {message.text}</Text>
                    ) : (
                        <Text color="green">✅  {message.text}</Text>
                    )}
                </Box>
            )}
        </Box>
    )
}

export default List;