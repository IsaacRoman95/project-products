// ProductList.jsx
import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ConfirmDeleteModal from "../Modals/ConfirmationModal";

const ProductList = ({ auth, products }) => {
    const [showModal, setShowModal] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);

    const openModal = (productId) => {
        setProductIdToDelete(productId);
        setShowModal(true);
    };

    const closeModal = () => {
        setProductIdToDelete(null);
        setShowModal(false);
    };

    const handleDelete = () => {
        if (productIdToDelete) {
            Inertia.delete(`/products/${productIdToDelete}`)
                .then(() => {
                    closeModal(); // Cerrar el modal después de eliminar
                })
                .catch((error) => {
                    console.error("Error al eliminar producto:", error);
                });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Lista de Productos
                </h2>
            }
        >
            <Head title="Lista de Productos" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Lista de Productos
                                </h3>
                                <button
                                    onClick={() =>
                                        Inertia.get("/products/create")
                                    }
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Nuevo Producto
                                </button>
                            </div>

                            <table className="min-w-full mt-4">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            ID
                                        </th>
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
                                            Precio
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            SubGrupo
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <tr key={product.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {product.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {product.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {product.price}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {product.sub_group.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() =>
                                                        Inertia.get(
                                                            `/products/${product.id}/edit`
                                                        )
                                                    }
                                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        openModal(product.id)
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
                <ConfirmDeleteModal
                    title="Confirmar Eliminación de Producto"
                    message="¿Estás seguro de que quieres eliminar este producto?"
                    onDelete={handleDelete}
                    onClose={closeModal}
                />
            )}
        </AuthenticatedLayout>
    );
};

export default ProductList;
