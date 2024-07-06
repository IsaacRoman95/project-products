import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmDeleteModal from "../Modals/ConfirmationModal";

const SalesIndex = ({ auth, orders }) => {
    const [showModal, setShowModal] = useState(false);
    const [orderIdToDelete, setOrderIdToDelete] = useState(null);

    const openModal = (orderId) => {
        setOrderIdToDelete(orderId);
        setShowModal(true);
    };

    const closeModal = () => {
        setOrderIdToDelete(null);
        setShowModal(false);
    };

    const handleDelete = () => {
        if (orderIdToDelete) {
            Inertia.delete(`/orders/${orderIdToDelete}`)
                .then(() => {
                    closeModal();
                    toast.success("Orden eliminada correctamente.");
                })
                .catch((error) => {
                    console.error("Error al eliminar orden:", error);
                    toast.error("Error al eliminar la orden.");
                });
        }
    };

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = new Date(dateString).toLocaleDateString(
            "es-ES",
            options
        );
        return formattedDate;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Lista de Órdenes de Venta
                </h2>
            }
        >
            <Head title="Lista de Órdenes de Venta" />

            <ToastContainer />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Órdenes de Venta
                                </h3>
                                <button
                                    onClick={() =>
                                        Inertia.get("/orders/create")
                                    }
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Nueva Venta
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
                                            Total
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Fecha
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
                                    {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {order.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {order.total}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {formatDate(order.created_at)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() =>
                                                        Inertia.get(
                                                            `/orders/${order.id}`
                                                        )
                                                    }
                                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Ver
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        openModal(order.id)
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
                    title="Confirmar Eliminación de Orden de Venta"
                    message="¿Estás seguro de que quieres eliminar esta orden de venta?"
                    onDelete={handleDelete}
                    onClose={closeModal}
                />
            )}
        </AuthenticatedLayout>
    );
};

export default SalesIndex;
