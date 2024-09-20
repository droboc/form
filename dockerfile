FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["BackendForms.API/BackendForms.API.csproj", "BackendForms.API/"]
COPY ["BackendForms.Infrastructure/BackendForms.Infrastructure.csproj", "BackendForms.Infrastructure/"]
COPY ["BackendForms.Core/BackendForms.Core.csproj", "BackendForms.Core/"]
RUN dotnet restore "BackendForms.API/BackendForms.API.csproj"
COPY . .
WORKDIR "/src/BackendForms.API"
RUN dotnet build "BackendForms.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BackendForms.API.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS final
WORKDIR /app
COPY --from=build /src /src
COPY --from=publish /app/publish /app
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh
WORKDIR /app
ENTRYPOINT ["/app/entrypoint.sh"]
