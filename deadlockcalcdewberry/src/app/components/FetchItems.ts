import { useState, useEffect } from "react";

interface Item {
    id: string;
    name: string;
    description: string;
    cost: number;
    tier: number;
    slot: "Weapon" | "Vitality" | "Spirit";
    passiveBonuses: { [key: string]: number };
    activeAbility?: {
        cooldown: number;
        duration: number;
        castRange: number;
        castDelay: number;
        resourceCost: number;
        moveSpeed: number;
    };
}

export const useFetchItems = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch("/data/items.json");
                const itemsData = await response.json();

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
