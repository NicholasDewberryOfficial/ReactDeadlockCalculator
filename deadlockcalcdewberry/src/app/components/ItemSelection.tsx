import React, { useState } from "react";
import ItemPopup from "./ItemPopup";
import { useFetchItems } from "./FetchItems";

interface ItemSectionProps {
    onSelectItem: (item: any) => void;
}

const ItemSection: React.FC<ItemSectionProps> = ({ onSelectItem }) => {
    const { items, loading, error } = useFetchItems();
    const [showPopup, setShowPopup] = useState<boolean>(false);

    if (loading) return <div>Loading items...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
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

            {showPopup && (
                <ItemPopup
                    items={items}
                    onSelectItem={(item) => {
                        onSelectItem(item);
                        setShowPopup(false);
                    }}
                    onClose={() => setShowPopup(false)}
                />
            )}
        </div>
    );
};

export default ItemSection;
