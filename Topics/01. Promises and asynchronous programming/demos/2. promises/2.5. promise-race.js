(function() {
    function getCourse(courseId) {
        var courses = {
            1: { name: 'JavaScript Fundamentals'},
            2: { name: 'JavaScript OOP'},
            3: { name: 'JavaScript UI & DOM'},
            4: { name: 'JavaScript Applications'},
        };
        return Promise.resolve(courses[courseId]);
    }

    var courseIds = [1,2,3,4];
    var promises = [];
    for (var i=0;i<courseIds.length;i+=1) {
        promises.push(getCourse(courseIds[i]));
    }

    Promise.race(promises)
        .then(function(values) {
            console.log(values);
        })
}());