import React from "react";

import { Item } from "./item"


interface ItemCardProps {
    // These may be optional if they're not always present
    // or if you parse them differently at fetch-time.
    Name?: string;
    Description: string;
    Cost?: number | string;
    Tier?: number | string;

    // Because different items can have varied stats,
    // let "passiveBonuses" safely handle string or number values,
    // and be optional if some items don’t have it.
    passiveBonuses?: { [key: string]: number | string };

    // Active abilities may or may not exist, and each
    // field might be numeric or string in the raw data.
    activeAbility?: {
        cooldown?: number | string;
        duration?: number | string;
        castRange?: number | string;
        castDelay?: number | string;
        resourceCost?: number | string;
        moveSpeed?: number | string;
    };

    // The one required prop for selecting the item
    onSelect: () => void;
}


const ItemCard: React.FC<ItemCardProps> = ({
                                               Name,
                                               Description,
                                               Cost,
                                               Tier,
                                               passiveBonuses,
                                               activeAbility,
                                               onSelect,
                                           }) => {
    return (
        <div
            onClick={onSelect}
            style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                margin: "10px",
                cursor: "pointer",
                backgroundColor: "#151313",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
            {/* Item Name */}
            <h3 style={{ marginBottom: "8px" }}>{Name}</h3>

            {/* Item Description */}
            <p style={{ fontSize: "0.9rem", marginBottom: "12px" }} dangerouslySetInnerHTML={{ __html: Description }} />

            {/* Item Cost and Tier */}
            <p>
                <strong>Cost:</strong> {Cost} | <strong>Tier:</strong> {Tier}
            </p>

            {/* Passive Bonuses */}
            <div style={{ marginTop: "12px" }}>
                <h4 style={{ fontSize: "0.95rem", marginBottom: "4px" }}>Passive Bonuses:</h4>
                <ul style={{ paddingLeft: "20px" }}>
                    {Object.entries(passiveBonuses ?? {}).map(([stat, value]) => (
                        <li key={stat} style={{ fontSize: "0.85rem" }}>
                            <strong>{stat}:</strong> {value}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Active Abilities */}
            {activeAbility && (
                <div style={{ marginTop: "12px" }}>
                    <h4 style={{ fontSize: "0.95rem", marginBottom: "4px" }}>Active Ability:</h4>
                    <ul style={{ paddingLeft: "20px" }}>
                        <li style={{ fontSize: "0.85rem" }}>
                            <strong>Cooldown:</strong> {activeAbility.cooldown}s
                        </li>
                        <li style={{ fontSize: "0.85rem" }}>
                            <strong>Duration:</strong> {activeAbility.duration}s
                        </li>
                        <li style={{ fontSize: "0.85rem" }}>
                            <strong>Cast Range:</strong> {activeAbility.castRange}m
                        </li>
                        <li style={{ fontSize: "0.85rem" }}>
                            <strong>Cast Delay:</strong> {activeAbility.castDelay}s
                        </li>
                        <li style={{ fontSize: "0.85rem" }}>
                            <strong>Resource Cost:</strong> {activeAbility.resourceCost}
                        </li>
                        <li style={{ fontSize: "0.85rem" }}>
                            <strong>Move Speed:</strong> {activeAbility.moveSpeed}m/s
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ItemCard;
