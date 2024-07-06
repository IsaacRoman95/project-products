// ConfirmationModal.jsx
import React from "react";

const ConfirmDeleteModal = ({ title, message, onDelete, onClose }) => {
    const handleDelete = () => {
        onDelete(); // Llamar a la función onDelete para realizar la acción de eliminación
    };

    return (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
            <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="relative bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">{title}</h2>
                <p className="mb-4">{message}</p>
                <div className="flex justify-end">
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                    >
                        Eliminar
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
