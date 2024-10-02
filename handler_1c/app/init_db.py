from sqlalchemy.ext.asyncio import AsyncSession
from app import services
from app.api.v1.schemas.organization import OrganizationCreate
from app.core import base_migration  # noqa: F401


async def init_db(db: AsyncSession) -> None:
    # создаем первую организацию
    organization = await services.organization_service.get(
        db, id=400
    )
    if not organization:
        organization_in = OrganizationCreate(
            id=400,
            title="Гроднеское агенство",
            fullname='РУП "Гродненское агентство по государственной регистрации и земельному кадастру"',
        )
        await services.organization_service.create(db, request=organization_in)
        
        organization_in = OrganizationCreate(
            id=401,
            title="Скидельское бюро",
            fullname='Скидельское бюро РУП "Гродненское агентство по государственной регистрации и земельному кадастру"',
        )
        await services.organization_service.create(db, request=organization_in)
        
        organization_in = OrganizationCreate(
            id=410,
            title="Волковыский филиал",
            fullname='Волковыский филиал РУП "Гродненское агентство по государственной регистрации и земельному кадастру"',
        )
        await services.organization_service.create(db, request=organization_in)
        organization_in = OrganizationCreate(
            id=411,
            title="Берестовицкое бюро",
            fullname='Берестовицкое бюро РУП "Гродненское агентство по государственной регистрации и земельному кадастру"',
        )
        await services.organization_service.create(db, request=organization_in)
        
        organization_in = OrganizationCreate(
            id=412,
            title="Мостовское бюро",
            fullname='Мостовское бюро РУП "Гродненское агентство по государственной регистрации и земельному кадастру"',
        )
        await services.organization_service.create(db, request=organization_in)
        
        organization_in = OrganizationCreate(
            id=413,
            title="Свислочское бюро",
            fullname='Свислочское бюро РУП "Гродненское агентство по государственной регистрации и земельному кадастру"',
        )
        await services.organization_service.create(db, request=organization_in)
        
        organization_in = OrganizationCreate(
            id=420,
            title="Лидский филиал",
            fullname='Лидский филиал РУП "Гродненское агентство по государственной регистрации и земельному кадастру"',
        )
        await services.organization_service.create(db, request=organization_in)
        
        organization_in = OrganizationCreate(
            id=421,
            title="Вороновское бюро",
            fullname='Вороновское бюро РУП "Гродненское агентство по государственной регистрации и земельному кадастру"',
        )
        await services.organization_service.create(db, request=organization_in)                        
        
        organization_in = OrganizationCreate(
            id=422,
            title="Щучинское бюро",
            fullname='Щучинское бюро РУП "Гродненское агентство по государственной регистрации и земельному кадастру"',
        )
        await services.organization_service.create(db, request=organization_in)                        
        
        organization_in = OrganizationCreate(
            id=430,
            title="Новогрудский филиал",
            fullname='Новогрудский филиал РУП "Гродненское агентство по государственной регистрации и земельному кадастру"',
        )
        await services.organization_service.create(db, request=organization_in)
        
        organization_in = OrganizationCreate(
            id=431,
            title="Кореличское бюро",
            fullname='Кореличское бюро РУП "Гродненское агентство по государственной регистрации и земельному кадастру"',            
        )
        await services.organization_service.create(db, request=organization_in)
        
        organization_in = OrganizationCreate(
            id=440,
            title="Ошмянский филиал",
            fullname='Ошмянский филиал РУП "Гродненское агентство по государственной регистрации и земельному кадастру"',
        )
        await services.organization_service.create(db, request=organization_in)
        
        organization_in = OrganizationCreate(
            id=441,
            title="Островецкое бюро",
            fullname='Островецкое бюро РУП "Гродненское агентство по государственной регистрации и земельному кадастру"',
        )
        await services.organization_service.create(db, request=organization_in)
        
        organization_in = OrganizationCreate(
            id=442,
            title="Ивьевское бюро",
            fullname='Ивьевское бюро РУП "Гродненское агентство по государственной регистрации и земельному кадастру"',
        )
        await services.organization_service.create(db, request=organization_in)
        
        organization_in = OrganizationCreate(
            id=443,
            title="Сморгонское бюро",
            fullname='Сморгонское бюро РУП "Гродненское агентство по государственной регистрации и земельному кадастру"',
        )
        await services.organization_service.create(db, request=organization_in)
        
        organization_in = OrganizationCreate(
            id=450,
            title="Слонимский филиал",
            fullname='Слонимский филиал РУП "Гродненское агентство по государственной регистрации и земельному кадастру"',
        )
        await services.organization_service.create(db, request=organization_in)
        
        organization_in = OrganizationCreate(
            id=451,
            title="Зельвенское бюро",
            fullname='Зельвенское бюро РУП "Гродненское агентство по государственной регистрации и земельному кадастру"',
        )
        await services.organization_service.create(db, request=organization_in)
        
        organization_in = OrganizationCreate(
            id=452,
            title="Дятловское бюро",
            fullname='Дятловское бюро РУП "Гродненское агентство по государственной регистрации и земельному кадастру"',
        )
        await services.organization_service.create(db, request=organization_in)
        
        print("***Success creating organization default.")
    else:
        print("Skipping creating organization.")

    
