import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
};

const ShowOrder = ({ auth, order }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detalles de la Orden #{order.id}
                </h2>
            }
        >
            <Head title={`Orden #${order.id}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="mb-4">
                                <button
                                    onClick={() => Inertia.get('/orders')}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    Volver a la Lista de Órdenes
                                </button>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold">Detalles de la Orden</h3>
                                <p><strong>ID:</strong> {order.id}</p>
                                <p><strong>Total:</strong> {order.total}</p>
                                <p><strong>Fecha:</strong> {formatDate(order.created_at)}</p>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold">Detalles de los Productos</h3>
                                <table className="min-w-full mt-4">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Producto
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Cantidad
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Precio
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {order.orderdetails && order.orderdetails.map((detail) => (
                                            <tr key={detail.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{detail.product.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{detail.quantity}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{detail.price}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{detail.price * detail.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {!order.orderdetails && (
                                    <p>No hay detalles disponibles para esta orden.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ShowOrder;
