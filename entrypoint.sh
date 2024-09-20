#!/bin/bash

# Espera a que la base de datos esté lista
until dotnet ef database update --project /src/BackendForms.Infrastructure/BackendForms.Infrastructure.csproj --startup-project /src/BackendForms.API/BackendForms.API.csproj; do
    >&2 echo "SQL Server is starting up"
    sleep 1
done

>&2 echo "SQL Server is up - executing command"

# Inicia la aplicación
exec dotnet BackendForms.API.dll
