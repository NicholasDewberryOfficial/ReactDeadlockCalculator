"use client";

import React, { useEffect, useState } from "react";
import CharacterCard from "./charactercardcomponent";
import ItemSelection from "./ItemSelection"; // <-- (Unchanged import)

interface Character {
    name: string;
    image: string;
    dps: number;
    bulletDamage: number;
    pelletsPerShot: number;
    ammo: number;
    bulletsPerSecond: number;
    reloadTime: number;
    bulletVelocity: number;
    lightMeleeDamage: number;
    heavyMeleeDamage: number;
    falloffRangeStart: number;
    falloffRangeEnd: number;
    health: number;
    healthRegen: number;
    moveSpeed: number;
    stamina: number;
    spiritPower: number;
}

const CharacterList: React.FC = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [attackingCharacter, setAttackingCharacter] = useState<Character | null>(null);
    const [defendingCharacter, setDefendingCharacter] = useState<Character | null>(null);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false); // Tracks visibility of the character cards

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("data/characters/characters.json");
                if (!response.ok) {
                    throw new Error("Failed to fetch character data");
                }
                const data: Character[] = await response.json();
                setCharacters(data);
            } catch (error) {
                console.error("Error fetching character data:", error);
            }
        };

        // Function to handle item selection (added)
        fetchData();
    }, []);

    const handleCharacterSelect = (character: Character, role: "attacker" | "defender") => {
        if (role === "attacker") {
            setAttackingCharacter(character);
        } else {
            setDefendingCharacter(character);
        }
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed); // Toggle the collapse state
    };

    return (
        <div>
            {/* Toggle Button */}
            <button
                onClick={toggleCollapse}
                style={{
                    padding: "10px 20px",
                    margin: "20px 0",
                    backgroundColor: "#342045",
                    color: "#f4e5ce",
                    border: "none",
                    width: "100%",
                    borderRadius: "5px",
                    cursor: "pointer",
                    // Added: Smooth transition for hover effect
                    transition: "background-color 0.3s ease, transform 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4a2960")} // Hover color
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#342045")} // Revert color
            >
                {isCollapsed ? "Show Characters" : "Hide Characters"}
            </button>

            {/* Collapsible Section */}
            <div
                style={{
                    maxHeight: isCollapsed ? "0" : "1000px", // Adjust height based on your content
                    overflow: "hidden", // Prevent overflow
                    transition: "max-height 0.5s ease", // Smooth height transition
                }}
            >
                {!isCollapsed && (
                    <>
                        <h1>Left click = choose attacker. Right click = choose defender.</h1>
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "20px",
                                padding: "20px",
                            }}
                        >
                            {characters.map((character, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleCharacterSelect(character, "attacker")}
                                    onContextMenu={(e) => {
                                        e.preventDefault();
                                        handleCharacterSelect(character, "defender");
                                    }}
                                    style={{
                                        border: attackingCharacter?.name === character.name
                                            ? "10px solid #fcac4d" // Orange for attacker
                                            : defendingCharacter?.name === character.name
                                                ? "10px solid #74b01c" // Green for defender
                                                : "10px solid transparent", // No border for unselected
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <CharacterCard
                                        name={character.name}
                                        image={character.image}
                                        dps={character.dps}
                                        bulletDamage={character.bulletDamage}
                                        pelletsPerShot={character.pelletsPerShot}
                                        ammo={character.ammo}
                                        bulletsPerSecond={character.bulletsPerSecond}
                                        reloadTime={character.reloadTime}
                                        bulletVelocity={character.bulletVelocity}
                                        lightMeleeDamage={character.lightMeleeDamage}
                                        heavyMeleeDamage={character.heavyMeleeDamage}
                                        falloffRangeStart={character.falloffRangeStart}
                                        falloffRangeEnd={character.falloffRangeEnd}
                                        health={character.health}
                                        healthRegen={character.healthRegen}
                                        moveSpeed={character.moveSpeed}
                                        stamina={character.stamina}
                                        spiritPower={character.spiritPower}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Selected Characters */}
            <div style={{ padding: "20px", border: "1px solid #ccc", marginTop: "20px" }}>
                <h2>Selected Characters</h2>
                <div>
                    <h3>Attacking Character</h3>
                    {attackingCharacter ? (
                        <p>
                            <strong>Name:</strong> {attackingCharacter.name} <br />
                            <strong>DPS:</strong> {attackingCharacter.dps} <br />
                            <strong>Spirit Power:</strong> {attackingCharacter.spiritPower}
                        </p>
                    ) : (
                        <p>No attacking character selected.</p>
                    )}
                </div>
                <div>
                    <h3>Defending Character</h3>
                    {defendingCharacter ? (
                        <p>
                            <strong>Name:</strong> {defendingCharacter.name} <br />
                            <strong>Health:</strong> {defendingCharacter.health} <br />
                            <strong>Falloff Range:</strong> {defendingCharacter.falloffRangeStart}m -{" "}
                            {defendingCharacter.falloffRangeEnd}m
                        </p>
                    ) : (
                        <p>No defending character selected.</p>
                    )}
                </div>
            </div>

            {/* ---------- NEW SECTION START ---------- */}
            {/* Add an ItemSelection component to integrate item popup */}
            <ItemSelection
                onSelectItem={(item) => {
                    console.log("Selected item:", item);
                }}
            />
            {/* ---------- NEW SECTION END ------------ */}
        </div>
    );
};

export default CharacterList;
