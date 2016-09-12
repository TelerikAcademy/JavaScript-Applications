(function () {

	//check if running on Node.js
	if (typeof require !== 'undefined') {
		//load underscore if on Node.js
		_ = require('../../scripts/underscore.js');
	}

	var Student = (function () {
		var markToString = function () {
			return this.subject + ': ' + this.mark;
		};

		function Student(name, grade) {
			this.name = name;
			this.grade = grade;
			this.marks = [];
		}

		Student.prototype.addMark = function (subject, mark) {
			this.marks.push({
				subject: subject,
				mark: mark,
				toString: markToString
			});
			return this;
		};

		return Student;
	}());

	var studentsCount = 15,
		marksCount = 10,
		students = [];

	for (var s = 0; s < studentsCount; s += 1) {
		var name = 'Student #' + (s + 1);

		//random grade from 1 to 12
		var grade = Math.floor(Math.random() * 12);

		var student = new Student(name, grade);

		for (var m = 0; m < marksCount; m += 1) {
			var subject = 'Subject #' + (m + 1);

			//random mark from 2 to 6
			var mark = Math.random() * 4 + 2;
			student.addMark(subject, mark);
		}

		students.push(student);
	}

	studentsOverallScore = _.map(students, function (student) {
		var overallScore = 0;
		_.each(student.marks, function (mark) {
			overallScore += mark.mark;
		});
		return {
			name: student.name,
			grade: student.grade,
			score: (overallScore / student.marks.length).toFixed(2)
		};
	});
	console.dir(studentsOverallScore);

}());