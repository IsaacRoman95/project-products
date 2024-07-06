// GroupIndex.jsx
import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ConfirmDeleteModal from "../Modals/ConfirmationModal";

const GroupIndex = ({ auth, groups }) => {
    const [showModal, setShowModal] = useState(false);
    const [groupIdToDelete, setGroupIdToDelete] = useState(null);

    const openModal = (groupId) => {
        setGroupIdToDelete(groupId);
        setShowModal(true);
    };

    const closeModal = () => {
        setGroupIdToDelete(null);
        setShowModal(false);
    };

    const handleDelete = () => {
        Inertia.delete(route("groups.destroy", groupIdToDelete)).then(() => {
            closeModal(); // Cerrar el modal después de eliminar
        }).catch((error) => {
            console.error("Error al eliminar grupo:", error);
        });
    };

    return (
        <AuthenticatedLayout
            user={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Grupo
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <Link
                                href={route("groups.create")}
                                className="text-blue-500"
                            >
                                Crear nuevo Grupo
                            </Link>
                            <table className="min-w-full mt-4">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Nombre
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {groups.map((group) => (
                                        <tr key={group.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {group.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link
                                                    href={route(
                                                        "groups.edit",
                                                        group.id
                                                    )}
                                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        openModal(group.id)
                                                    }
                                                    className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <ConfirmDeleteModal
                    title="Confirmar Eliminación de Grupo"
                    message="¿Estás seguro de que quieres eliminar este grupo?"
                    onDelete={handleDelete}
                    onClose={closeModal}
                />
            )}
        </AuthenticatedLayout>
    );
};

export default GroupIndex;
