import { useState, useEffect } from "react";
import { Item } from "./item"

export const useFetchItems = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch("data/items/items.json");
                const itemsData = await response.json();
                console.log("itemsData", itemsData);
                if (!itemsData) {
                    throw new Error("itemsData is null or undefined");
                }
                const itemsArray: Item[] = Object.keys(itemsData).map((key) => ({
                    id: key,
                    ...itemsData[key],
                }));

                setItems(itemsArray);
            } catch (err) {
                setError("Failed to fetch items");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    return { items, loading, error };
};
