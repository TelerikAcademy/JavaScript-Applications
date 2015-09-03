export default {
    dbShopToShopVM: function(dbShop){
        var owner = dbShop.get('owner');
        return {
            id: dbShop.id,
            name: dbShop.get('name'),
            ownerId: owner ? owner.id : null
        }
    }
}