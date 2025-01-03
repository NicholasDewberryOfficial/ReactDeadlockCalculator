import React from 'react';

// Define the type for the character props
interface CharacterCardProps {
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

// CharacterCard component
const CharacterCard: React.FC<CharacterCardProps> = ({
                                                         name,
                                                         image,
                                                         dps,
                                                         bulletDamage,
                                                         pelletsPerShot,
                                                         ammo,
                                                         bulletsPerSecond,
                                                         reloadTime,
                                                         bulletVelocity,
                                                         lightMeleeDamage,
                                                         heavyMeleeDamage,
                                                         falloffRangeStart,
                                                         falloffRangeEnd,
                                                         health,
                                                         healthRegen,
                                                         moveSpeed,
                                                         stamina,
                                                         spiritPower,
                                                     }) => {
    return (
        <div style={styles.card}>
            <img src={image} alt={`${name} image`} style={styles.image} />
            <div style={styles.info}>
                <h2 style={styles.name}>{name}</h2>
                <p><strong>DPS:</strong> {dps}</p>
                <p><strong>Bullet Damage:</strong> {bulletDamage}</p>
                <p><strong>Pellets per shot:</strong> {pelletsPerShot}</p>
                <p><strong>Ammo:</strong> {ammo}</p>
                <p><strong>Bullets Per Second:</strong> {bulletsPerSecond}</p>
                <p><strong>Reload Time:</strong> {reloadTime}s</p>
                <p><strong>Bullet Velocity:</strong> {bulletVelocity} m/s</p>
                <p><strong>Light Melee Damage:</strong> {lightMeleeDamage}</p>
                <p><strong>Heavy Melee Damage:</strong> {heavyMeleeDamage}</p>
                <p><strong>Falloff Range:</strong> {falloffRangeStart}m - {falloffRangeEnd}m</p>
                <p><strong>Health:</strong> {health}</p>
                <p><strong>Health Regen:</strong> {healthRegen}/s</p>
                <p><strong>Move Speed:</strong> {moveSpeed} m/s</p>
                <p><strong>Stamina:</strong> {stamina}</p>
                <p><strong>Spirit Power: {spiritPower}  </strong></p>
            </div>
        </div>
    );
};

// Inline styles for simplicity (replace with CSS/SCSS as needed)
const styles = {
    card: {
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
        width: "300px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column" as "column",
        alignItems: "center",
        backgroundColor: "#28281f", // Light gray background
        color: "#f4e5ce", // Text color
        fontFamily: "'MyCustomFont', sans-serif", // Optional font addition
    },
    image: {
        width: "100%",
        height: "auto",
    },
    info: {
        padding: "16px",
        textAlign: "left" as "left",
    },
    name: {
        margin: "0 0 16px",
        fontSize: "1.5rem",
        textAlign: "center" as "center",
    },
};


export default CharacterCard;
