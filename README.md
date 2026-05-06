mkdir pulsewatch

cd pulsewatch

# ROOT FILES
New-Item README.md -ItemType File
New-Item .gitignore -ItemType File
New-Item docker-compose.yml -ItemType File

# =========================
# BACKEND
# =========================

mkdir backend
cd backend

New-Item requirements.txt -ItemType File
New-Item pulsewatch.db -ItemType File

mkdir app
cd app

New-Item main.py -ItemType File

mkdir api
cd api

New-Item provider_routes.py -ItemType File
New-Item analytics_routes.py -ItemType File

cd ..

mkdir services
cd services

New-Item provider_service.py -ItemType File
New-Item openai_service.py -ItemType File
New-Item anthropic_service.py -ItemType File
New-Item github_service.py -ItemType File
New-Item stripe_service.py -ItemType File

cd ..

mkdir models
cd models

New-Item provider_models.py -ItemType File

cd ..

mkdir schemas
cd schemas

New-Item provider_schema.py -ItemType File

cd ..

mkdir core
cd core

New-Item config.py -ItemType File
New-Item security.py -ItemType File

cd ..

mkdir utils
cd utils

New-Item mock_data.py -ItemType File

cd ..
cd ..
cd ..

# =========================
# FRONTEND
# =========================

mkdir frontend
cd frontend

mkdir src
cd src

mkdir app
cd app

New-Item page.tsx -ItemType File
New-Item layout.tsx -ItemType File
New-Item globals.css -ItemType File

mkdir dashboard

cd ..

mkdir components
cd components

New-Item AddProvider.tsx -ItemType File
New-Item AnalyticsCard.tsx -ItemType File
New-Item HeroChart.tsx -ItemType File
New-Item Sidebar.tsx -ItemType File
New-Item ProviderList.tsx -ItemType File
New-Item StatusBadge.tsx -ItemType File

cd ..

mkdir services
cd services

New-Item api.ts -ItemType File
New-Item storage.ts -ItemType File

cd ..

mkdir hooks
cd hooks

New-Item useProviders.ts -ItemType File

cd ..

mkdir types
cd types

New-Item provider.ts -ItemType File

cd ..

mkdir styles
cd styles

New-Item dashboard.css -ItemType File

cd ..
cd ..

New-Item package.json -ItemType File
New-Item tsconfig.json -ItemType File

cd ..

# =========================
# DOCS
# =========================

mkdir docs
cd docs

New-Item architecture.md -ItemType File
New-Item roadmap.md -ItemType File

cd ..

Write-Host ""
Write-Host "PulseWatch structure created successfully."