//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Student {
  address public _teacher;
  uint public _score;
  string public _id;
  constructor(string memory ID, uint score) {
    require(score < 100, "score cannot be greater than 100");
    _id = ID;
    _score = score;
    _teacher = msg.sender;
  }
  modifier isTeacher() {
    require(msg.sender == _teacher, "Is not from teacher contract");
    _;
  }
  function getScore() external view returns(uint){
    return _score;
  }
  function setScore(uint score) public isTeacher {
    require(score <= 100, "score cannot be greater than 100");
    _score = score;
  }
}

interface IStudent {
  function getScore() external view returns(uint);
  function setScore(uint score) external;
}

contract Teacher {
  mapping(string=>address) public students;
  function getScore(string memory ID) public view returns(uint){
    require(students[ID] != address(0), "Don't have student");
    return IStudent(students[ID]).getScore();
  }
  function addStudentScore(string memory ID, uint score) public {
    require(students[ID] == address(0), "Duplicate student");
    Student student = new Student(ID, score);
    students[ID] = address(student);
  }
  function setScore(string memory ID, uint score) public {
    require(students[ID] != address(0), "Don't have student");
    IStudent(students[ID]).setScore(score);
  }
}
