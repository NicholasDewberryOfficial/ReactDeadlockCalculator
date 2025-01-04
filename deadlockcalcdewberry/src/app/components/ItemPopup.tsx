import React, { useState } from "react";
import ItemCard from "./ItemCard";

interface Item {
    id: string;
    Name: string;
    Description: string;
    Cost: number;
    Tier: number;
    Slot: "Weapon" | "Armor" | "Spirit";
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

interface ItemPopupProps {
    items: Item[];
    onSelectItem: (item: Item) => void;
    onClose: () => void;
}

// NEW: Function to get the transparent background per category
function getCategoryBackground(category: "Weapon" | "Armor" | "Spirit"): string {
    switch (category) {
        case "Weapon":
            return "#3a2b08"; // Weapon color
        case "Armor":
            return "#1d3100"; // Vitality color
        case "Spirit":
            return "#342045"; // Spirit color
    }
}

const ItemPopup: React.FC<ItemPopupProps> = ({ items, onSelectItem, onClose }) => {
    const [activeCategory, setActiveCategory] = useState<"Weapon" | "Armor" | "Spirit">("Weapon");

    // Filter items by active category
    const filteredItems = items.filter((item) => item.Slot === activeCategory);

    // NEW: Group items by Tier, then sort by Name
    const groupedByTier = filteredItems.reduce<Record<number, Item[]>>((acc, item) => {
        const tierKey = item.Tier;
        if (!acc[tierKey]) acc[tierKey] = [];
        acc[tierKey].push(item);
        return acc;
    }, {});

    // Sorted list of tier keys (1,2,3,4...) if needed
    const sortedTiers = Object.keys(groupedByTier)
        .map(Number)
        .sort((a, b) => a - b);

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                // CHANGED: Use our getCategoryBackground for unique transparency/color
                backgroundColor: getCategoryBackground(activeCategory),
                opacity: 0.9, // Slight transparency
                zIndex: 1000,
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                overflowY: "scroll",
            }}
        >
            {/* Header with Tabs and Close Button */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                {/* Tabs for Category Selection */}
                <div>
                    <button
                        onClick={() => setActiveCategory("Weapon")}
                        style={{
                            marginRight: "10px",
                            padding: "10px",
                            backgroundColor: activeCategory === "Weapon" ? "#007bff" : "#444",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Weapon
                    </button>
                    <button
                        onClick={() => setActiveCategory("Armor")}
                        style={{
                            marginRight: "10px",
                            padding: "10px",
                            backgroundColor: activeCategory === "Armor" ? "#007bff" : "#444",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Vitality
                    </button>
                    <button
                        onClick={() => setActiveCategory("Spirit")}
                        style={{
                            padding: "10px",
                            backgroundColor: activeCategory === "Spirit" ? "#007bff" : "#444",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Spirit
                    </button>
                </div>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        padding: "10px",
                        fontSize: "1.5rem",
                        color: "#fff",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    ✖
                </button>
            </div>

            {/* Grouped Items by Tier */}
            {sortedTiers.length > 0 ? (
                sortedTiers.map((tier) => {
                    const tierItems = groupedByTier[tier];
                    // Sort by Name alphabetically
                    tierItems.sort((a, b) => a.Name.localeCompare(b.Name));

                    return (
                        <div key={tier} style={{ marginBottom: "24px" }}>
                            <h2 style={{ color: "#fff" }}>Tier {tier}</h2>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                                {tierItems.map((item) => (
                                    <ItemCard
                                        key={item.id}
                                        Name={item.Name}
                                        Description={item.Description}
                                        Cost={item.Cost}
                                        Tier={item.Tier}
                                        passiveBonuses={item.passiveBonuses}
                                        activeAbility={item.activeAbility}
                                        onSelect={() => onSelectItem(item)}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })
            ) : (
                <p style={{ color: "#fff", fontSize: "1rem" }}>
                    No items available in this category.
                </p>
            )}
        </div>
    );
};

export default ItemPopup;
