import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ConfirmDeleteModal from "../Modals/ConfirmationModal";

const SubgroupIndex = () => {
    const { auth, subgroups } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [subgroupIdToDelete, setSubgroupIdToDelete] = useState(null);

    const openModal = (subgroupId) => {
        setSubgroupIdToDelete(subgroupId);
        setShowModal(true);
    };

    const closeModal = () => {
        setSubgroupIdToDelete(null);
        setShowModal(false);
    };

    const handleDelete = () => {
        if (subgroupIdToDelete) {
            Inertia.delete(route("subgroups.destroy", subgroupIdToDelete)).then(() => {
                closeModal();
            }).catch((error) => {
                console.error("Error al eliminar subgrupo:", error);
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Subgrupos
                </h2>
            }
        >
            <Head title="Subgrupos" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <Link
                                href={route("subgroups.create")}
                                className="text-blue-500"
                            >
                                Crear Nuevo Subgrupo
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
                                            Grupo
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
                                    {subgroups.map((subgroup) => (
                                        <tr key={subgroup.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {subgroup.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {subgroup.group.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link
                                                    href={route(
                                                        "subgroups.edit",
                                                        subgroup.id
                                                    )}
                                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Editar
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        openModal(subgroup.id)
                                                    }
                                                    className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                >
                                                    Eliminar
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
                <ConfirmationModal
                    title="Confirmar Eliminación de Subgrupo"
                    message="¿Estás seguro de que quieres eliminar este subgrupo?"
                    onDelete={handleDelete}
                    onClose={closeModal}
                />
            )}
        </AuthenticatedLayout>
    );
};

export default SubgroupIndex;
