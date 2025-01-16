// ItemCard.tsx

import React, { useState } from "react";

interface ItemCardProps {
    Name?: string;
    Description?: string;
    Cost?: number | string;
    Tier?: number | string;
    passiveBonuses?: { [key: string]: number | string };
    activeAbility?: {
        cooldown?: number | string;
        duration?: number | string;
        castRange?: number | string;
        castDelay?: number | string;
        resourceCost?: number | string;
        moveSpeed?: number | string;
    };
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
    // NEW: State to track hover
    const [isHovered, setIsHovered] = useState(false);

    // NEW: Hover handlers
    const handleMouseEnter = () => {
        setIsHovered(true);
        console.log("Hovering")
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            onClick={onSelect}
            onMouseEnter={handleMouseEnter}  // NEW
            onMouseLeave={handleMouseLeave} // NEW
            style={{
                width: "180px",
                height: "220px",
                position: "relative",
                margin: "10px",
                cursor: "pointer",
                backgroundColor: "#060e00",
                color: "#f4e5ce",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
            }}
        >
            {/* Minimal view: always visible */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "8px",
                }}
            >
                <h4 style={{ margin: 0 }}>{Name}</h4>
            </div>

            {/* Detailed overlay: only show when hovered */}
            {isHovered && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#060e00",
                        color: "wheat",
                        padding: "16px",
                        boxSizing: "border-box",
                        overflowY: "auto",
                    }}
                >
                    {/* Detailed Content */}
                    <h4 style={{ marginBottom: "8px" }}>{Name}</h4>
                    {Description && (
                        <p
                            style={{ fontSize: "0.9rem", marginBottom: "12px" }}
                            dangerouslySetInnerHTML={{ __html: Description }}
                        />
                    )}
                    <p>
                        <strong>Cost:</strong> {Cost} | <strong>Tier:</strong> {Tier}
                    </p>

                    {/* Passive Bonuses */}
                    {passiveBonuses && (
                        <div style={{ marginTop: "12px" }}>
                            <h4 style={{ fontSize: "0.95rem", marginBottom: "4px" }}>
                                Passive Bonuses:
                            </h4>
                            <ul style={{ paddingLeft: "20px" }}>
                                {Object.entries(passiveBonuses ?? {}).map(([stat, value]) => (
                                    <li key={stat} style={{ fontSize: "0.85rem" }}>
                                        <strong>{stat}:</strong> {value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Active Ability */}
                    {activeAbility && (
                        <div style={{ marginTop: "12px" }}>
                            <h4 style={{ fontSize: "0.95rem", marginBottom: "4px" }}>
                                Active Ability:
                            </h4>
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
            )}
        </div>
    );
};

export default ItemCard;
