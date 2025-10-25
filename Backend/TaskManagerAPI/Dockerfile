# Use .NET 8 SDK for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY ["TaskManagerAPI.csproj", "./"]
RUN dotnet restore "TaskManagerAPI.csproj"

# Copy everything else and build
COPY . .
RUN dotnet build "TaskManagerAPI.csproj" -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "TaskManagerAPI.csproj" -c Release -o /app/publish

# Use runtime image for final stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Copy published app
COPY --from=publish /app/publish .

# Set environment variables
ENV ASPNETCORE_URLS=http://+:${PORT:-5000}
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "TaskManagerAPI.dll"]
