import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateOrder = ({ auth, products }) => {
    const [formData, setFormData] = useState({
        product_id: "",
        quantity: 1, // Valor mínimo por defecto
        price: "",
        order_details: [],
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "product_id") {
            const product = products.find(
                (product) => product.id === parseInt(value, 10)
            );
            if (product) {
                setFormData((prev) => ({
                    ...prev,
                    price: parseFloat(product.price).toFixed(2),
                }));
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.product_id && formData.quantity && formData.price) {
            const subtotal = (
                parseFloat(formData.quantity) * parseFloat(formData.price)
            ).toFixed(2);

            const detail = {
                product_id: formData.product_id,
                product_name:
                    products.find(
                        (product) =>
                            product.id === parseInt(formData.product_id, 10)
                    )?.name || "",
                quantity: formData.quantity,
                price: formData.price,
                subtotal: subtotal,
            };

            setFormData((prev) => ({
                ...prev,
                order_details: [...prev.order_details, detail],
                product_id: "",
                quantity: 1, // Reinicia la cantidad mínima por defecto
                price: "",
            }));
        }

        // Reiniciar errores de validación
        setErrors({});
    };

    const removeDetail = (index) => {
        const updatedDetails = [...formData.order_details];
        updatedDetails.splice(index, 1);
        setFormData((prev) => ({
            ...prev,
            order_details: updatedDetails,
        }));
    };

    const handleOrderTotalChange = () => {
        const total = formData.order_details
            .reduce((acc, detail) => {
                return acc + parseFloat(detail.subtotal || 0);
            }, 0)
            .toFixed(2);
        setFormData((prev) => ({ ...prev, total }));
    };

    const saveOrder = () => {
        const total = formData.order_details
            .reduce((acc, detail) => {
                return acc + parseFloat(detail.subtotal || 0);
            }, 0)
            .toFixed(2);

        const data = {
            order_details: formData.order_details,
            total: total, // Asegúrate de incluir el campo total correctamente
        };

        // Enviar datos usando Inertia.js
        Inertia.post(route("orders.store"), data)
            .then(() => {
                // Éxito: Limpiar el formulario
                setFormData({
                    product_id: "",
                    quantity: 1,
                    price: "",
                    order_details: [],
                });
                toast.success('Orden de venta creada correctamente.');
            })
            .catch((error) => {
                // Error: Mostrar errores de validación
                if (error.response && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                }
                toast.error('Error al guardar la orden de venta.');
            });
    };

    return (
        <AuthenticatedLayout
            user={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Crear Orden de Venta
                </h2>
            }
        >
            <Head title="Crear Orden de Venta" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                Crear Orden de Venta
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Producto
                                    </label>
                                    <select
                                        name="product_id"
                                        value={formData.product_id}
                                        onChange={handleChange}
                                        className={`mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                                            errors.product_id
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        required
                                    >
                                        <option value="">
                                            Seleccionar Producto
                                        </option>
                                        {products.map((product) => (
                                            <option
                                                key={product.id}
                                                value={product.id}
                                            >
                                                {product.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.product_id && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.product_id}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Cantidad
                                    </label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        min="1"
                                        className={`mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                                            errors.quantity
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        required
                                    />
                                    {errors.quantity && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.quantity}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Precio Unitario
                                    </label>
                                    <input
                                        type="text"
                                        name="price"
                                        value={formData.price}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        readOnly
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                                >
                                    Agregar Producto
                                </button>
                            </form>
                            {formData.order_details.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Productos Agregados
                                    </h3>
                                    <table className="mt-4 w-full border-collapse border border-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="p-2 border border-gray-200">
                                                    Producto
                                                </th>
                                                <th className="p-2 border border-gray-200">
                                                    Cantidad
                                                </th>
                                                <th className="p-2 border border-gray-200">
                                                    Precio Unitario
                                                </th>
                                                <th className="p-2 border border-gray-200">
                                                    Subtotal
                                                </th>
                                                <th className="p-2 border border-gray-200">
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formData.order_details.map(
                                                (detail, index) => (
                                                    <tr key={index}>
                                                        <td className="p-2 border border-gray-200">
                                                            {
                                                                detail.product_name
                                                            }
                                                        </td>
                                                        <td className="p-2 border border-gray-200">
                                                            {detail.quantity}
                                                        </td>
                                                        <td className="p-2 border border-gray-200">
                                                            {detail.price}
                                                        </td>
                                                        <td className="p-2 border border-gray-200">
                                                            {detail.subtotal}
                                                        </td>
                                                        <td className="p-2 border border-gray-200">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeDetail(
                                                                        index
                                                                    )
                                                                }
                                                                className="text-sm bg-red-600 text-white px-4 py-2 rounded-md"
                                                            >
                                                                Eliminar
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Total de la Orden de Venta
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.order_details
                                                .reduce(
                                                    (acc, detail) =>
                                                        acc +
                                                        parseFloat(
                                                            detail.subtotal || 0
                                                        ),
                                                    0
                                                )
                                                .toFixed(2)}
                                            readOnly
                                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                    <button
                                        onClick={saveOrder}
                                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
                                    >
                                        Guardar Orden de Venta
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </AuthenticatedLayout>
    );
};

export default CreateOrder;
