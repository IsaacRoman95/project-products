import React from "react";
import { useForm } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const CreateSubgroup = ({ auth, groups }) => {
    const { data, setData, post, errors } = useForm({
        name: "",
        group_id: "", // Campo para almacenar el ID del grupo seleccionado
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("subgroups.store"), {
            onSuccess: () => {
                // Lógica adicional después de crear el subgrupo, como redirigir o mostrar mensajes
            },
            data: data, // Enviar los datos del formulario, incluido el group_id
        });
    };

    return (
        <AuthenticatedLayout
            user={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Crear Subgrupo
                </h2>
            }
        >
            <Head title="Crear Subgrupo" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Nombre del Subgrupo
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="mt-1 block w-full px-3 py-2 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                        required
                                        autoFocus
                                    />
                                    {errors.name && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="group_id"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Grupo
                                    </label>
                                    <select
                                        id="group_id"
                                        name="group_id"
                                        value={data.group_id}
                                        onChange={(e) =>
                                            setData("group_id", e.target.value)
                                        }
                                        className="mt-1 block w-full px-3 py-2 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Crear Subgrupo
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

export default CreateSubgroup;
