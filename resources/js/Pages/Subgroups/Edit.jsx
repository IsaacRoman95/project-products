import React from "react";
import { useForm } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const EditSubgroup = ({ auth, subgroup, groups }) => {
    const { data, setData, put, errors } = useForm({
        name: subgroup.name,
        group_id: subgroup.group_id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("subgroups.update", subgroup.id), {
            onSuccess: () => {
                // Redirigir o mostrar mensaje de éxito
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth}>
            <Head title={`Editar ${subgroup.name}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">
                                Editar Subgrupo
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nombre del Subgrupo
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Grupo
                                    </label>
                                    <select
                                        name="group_id"
                                        value={data.group_id}
                                        onChange={(e) =>
                                            setData("group_id", e.target.value)
                                        }
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    >
                                        <option value="">
                                            Seleccionar Grupo
                                        </option>
                                        {groups.map((group) => (
                                            <option
                                                key={group.id}
                                                value={group.id}
                                            >
                                                {group.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.group_id && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.group_id}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                                    >
                                        Guardar Cambios
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

export default EditSubgroup;
