"use client";

import React, { useEffect, useState } from "react";
import CharacterCard from "./charactercardcomponent";

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

import ItemPopup from "./ItemPopup"; // Added: Import ItemPopup

// Define the Item interface for type safety
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


const CharacterList: React.FC = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [attackingCharacter, setAttackingCharacter] = useState<Character | null>(null);
    const [defendingCharacter, setDefendingCharacter] = useState<Character | null>(null);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false); // Tracks visibility of the character cards

    // Added: State for managing the list of items (populate this with your JSON data)
    //const [items, setItems] = useState<Item[]>([]);
    const [items, setItems] = useState<Item[]>([]); // Ensure default value is []


    // Added: State to track if the ItemPopup modal is open
    const [showPopup, setShowPopup] = useState<boolean>(false);

    // Added: State for managing selected items for the build
    const [selectedItems, setSelectedItems] = useState<Item[]>([]);

    const [loading, setLoading] = useState<boolean>(true); // Optional: Loading state

    // Function to handle item selection (added)
    const handleSelectItem = (item: Item) => {
        if (selectedItems.length < 12) {
            setSelectedItems([...selectedItems, item]);
            setShowPopup(false); // Close the popup after selecting an item
        } else {
            alert("You can only select up to 12 items!"); // Limit items to 12
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch both files in parallel
                const [charactersResponse, itemsResponse] = await Promise.all([
                    fetch("/data/characters/characters.json"), // Adjust path as needed
                    fetch("/data/items/items.json"),     // Adjust path as needed
                ]);

                if (!charactersResponse.ok || !itemsResponse.ok) {
                    throw new Error("Failed to fetch data");
                }

                // Parse JSON responses
                const charactersData: Character[] = await charactersResponse.json();
                const itemsData: Item[] = await itemsResponse.json();



                // Update state
                setCharacters(charactersData);
                if (!Array.isArray(itemsData)) {
                    throw new Error("Items data is not an array");
                }
                setItems(itemsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Stop loading
            }
        };




        // Function to handle item selection (added)
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;


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
                }}
            >
                {isCollapsed ? "Show Characters" : "Hide Characters"}
            </button>

            {/* Collapsible Section */}
            {!isCollapsed && (
                <>
                    <h1> Left click = choose attacker. Right click = choose defender.</h1>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px" }}>
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

            {/* Added: Button to open the ItemPopup modal */}
            <button
                onClick={() => setShowPopup(true)}
                style={{
                    padding: "10px",
                    backgroundColor: "#342045",
                    color: "#f4e5ce",
                    border: "none",
                    cursor: "pointer",
                    marginBottom: "20px",
                }}
            >
                Modify Build
            </button>

            {/* Added: Render the ItemPopup modal when showPopup is true */}
            {showPopup && (
                <ItemPopup
                    items={items} // Pass the list of items
                    onSelectItem={handleSelectItem} // Handle item selection
                    onClose={() => setShowPopup(false)} // Close the popup
                />
            )}

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

            {/* Added: Selected Items Section */}
            <h2>Selected Items:</h2>
            <ul>
                {selectedItems.map((item, index) => (
                    <li key={index}>{item.name}</li>
                ))}
            </ul>
        </div>
    );

};

export default CharacterList;
