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

const ItemPopup: React.FC<ItemPopupProps> = ({ items, onSelectItem, onClose }) => {
    const [activeCategory, setActiveCategory] = useState<"Weapon" | "Armor" | "Spirit">("Weapon");

    // Filter items based on the active category
    const filteredItems = items.filter((item) => item.Slot === activeCategory);

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
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

            {/* Item List */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
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
                    ))
                ) : (
                    <p style={{ color: "#fff", fontSize: "1rem" }}>No items available in this category.</p>
                )}
            </div>
        </div>
    );
};

export default ItemPopup;
