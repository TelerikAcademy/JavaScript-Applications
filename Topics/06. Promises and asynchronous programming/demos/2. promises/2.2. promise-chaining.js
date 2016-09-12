(function() {
    function getOrder(orderId) {
        //return Promise.reject('no connection!');
        return Promise.resolve({userId:35});
    }
    function getUser(userId) {
        //return Promise.reject('no connection!');
        return Promise.resolve({companyId:18});
    }
    function getCompany(companyId) {
        //return Promise.reject('no connection!');
        return Promise.resolve({name:'Telerik Academy'});
    }

    getOrder(3).then(function(order){
            return getUser(order.userId);
        }).then(function(user){
            return getCompany(user.companyId);
        }).then(function(company){
            console.log(company.name);
        }).catch(function(error){
            console.log(error);
        });
}());