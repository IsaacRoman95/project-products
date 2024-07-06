import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Paper, Typography } from "@mui/material";

const SubGroupShow = ({ subGroup }) => {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detalles del SubGrupo</h2>}
        >
            <Head title={`SubGrupo: ${subGroup.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Paper className="p-6">
                        <Typography variant="h4" gutterBottom>
                            {subGroup.name}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Grupo: {subGroup.group.name}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            ID: {subGroup.id}
                        </Typography>
                        <InertiaLink href={`/sub-groups/${subGroup.id}/edit`} className="text-blue-500 hover:underline">
                            Editar
                        </InertiaLink>
                    </Paper>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default SubGroupShow;
