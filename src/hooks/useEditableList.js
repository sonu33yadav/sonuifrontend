import { useState } from 'react';

export default function useEditableList(initialItems = []) {
    const [items, setItems] = useState(initialItems);
    const [editingId, setEditingId] = useState(null);
    const [editedValues, setEditedValues] = useState({});

    const startEdit = (item) => {
        setEditingId(item.id);
        setEditedValues(item);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditedValues({});
    };

    const updateField = (field, value) => {
        setEditedValues((prev) => ({ ...prev, [field]: value }));
    };

    const saveEdit = async (onSave) => {
        const updatedItem = await onSave(editingId, editedValues);
        setItems((prev) => prev.map((item) => (item.id === editingId ? updatedItem : item)));
        cancelEdit();
    };

    return {
        items,
        setItems,
        editingId,
        editedValues,
        startEdit,
        cancelEdit,
        updateField,
        saveEdit,
    };
}
