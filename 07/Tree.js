function File(name, size) {
  return {
    name,
    size,
    parent: null,
    childrenFiles: [],

    getSize: function () {
      return this.size;
    },

    getChildrenFiles: function () {
      return this.childrenFiles;
    },

    getParent: function () {
      return this.parent;
    },
    getFileByName: function (name) {
      return this.childrenFiles.find(file => file.name === name);
    },
    addChild: function (name, size) {
      let newFile = File(name, size);
      newFile.parent = this;
      this.childrenFiles.push(newFile);
    }
  };
}

function FileTree() {
  return {
    files: [],
    addRoot: function (file) {
      this.files.push(file);
    },
    getRoot: function () {
      return this.files[0];
    }
  };
}

const initTree = function (data, fileTree) {
  let rootFile = File("/", null);
  fileTree.addRoot(rootFile);
  let currentNode = fileTree.getRoot();

  data.forEach(command => {
    if (command[0] === "$" && command[1] === "cd") {
      if (command[2] === "/") {
        currentNode = fileTree.getRoot();
      } else if (command[2] === "..") {
        currentNode = currentNode.getParent();
      } else {
        currentNode = currentNode.getFileByName(command[2]);
      }
    } else if (command[0] === "dir") {
      currentNode.addChild(command[1], null);
    } else if (command[0].search(/^[0-9]+$/) != -1) {
      currentNode.addChild(command[1], command[0]);
    }
  });
};

module.exports = { File, FileTree, initTree };
