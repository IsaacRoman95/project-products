import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const ProductCreate = ({ auth, groups }) => {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        sub_group_id: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post("/products", formData);
    };

    return (
        <AuthenticatedLayout
            user={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Crear Producto
                </h2>
            }
        >
            <Head title="Crear Producto" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Precio
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        SubGrupo
                                    </label>
                                    <select
                                        name="sub_group_id"
                                        value={formData.sub_group_id}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    >
                                        <option value="">
                                            Seleccionar SubGrupo
                                        </option>
                                        {groups.map((group) =>
                                            group.sub_groups.map(
                                                (subGroup) => (
                                                    <option
                                                        key={subGroup.id}
                                                        value={subGroup.id}
                                                    >
                                                        {group.name} -{" "}
                                                        {subGroup.name}
                                                    </option>
                                                )
                                            )
                                        )}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                                    >
                                        Crear
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ProductCreate;
