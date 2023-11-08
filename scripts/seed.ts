const { PrismaClient } = require('@prisma/client')

const db = new PrismaClient()

async function main(){
    try {
        await db.category.createMany({
            data: [
                { name: 'Famous People'},
                { name: 'Movies & TV'},
                { name: 'Musicians'},
                { name: 'Sports & Athletes'},
                { name: 'Food & Culinary'},
                { name: 'Travel & Adventure'},
                { name: 'Science & Technology'},
                { name: 'Art & Creativity'},
                { name: 'Historical Figures'},
            ]
        })  
    } catch (error) {
        console.error('ERROR seeding default category',error)
        
    } finally {
        await db.$disconnect()
    }
}

main()