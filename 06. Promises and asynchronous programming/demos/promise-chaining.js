(function() {
    function getOrder(orderId) {
        return Promise.resolve({userId:35});
    }
    function getUser(userId) {
        return Promise.resolve({companyId:18});
    }
    function getCompany(companyId) {
        return Promise.resolve({name:'Telerik Academy'});
    }

    function getCourse(courseId) {
        var courses = {
            1: { name: 'JavaScript Fundamentals'},
            2: { name: 'JavaScript '},
            3: { name: 'JavaScript '},
            4: { name: 'JavaScript '},
        }
    }

}());