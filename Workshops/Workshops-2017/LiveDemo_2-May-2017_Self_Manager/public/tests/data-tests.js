describe('Data layer tests', () => {
  const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username',
    LOCAL_STORAGE_AUTHKEY_KEY = 'signed-in-user-auth-key';

  const clearLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_USERNAME_KEY);
    localStorage.removeItem(LOCAL_STORAGE_AUTHKEY_KEY);
  };

  beforeEach(clearLocalStorage);
  afterEach(clearLocalStorage);

  describe('User tests', () => {
    describe('Register tests', () => {
      let jsonRequesterPostStub;
      let cryptoJSStub;
      const passHash = 'SOME_PASS_HASH';

      beforeEach(() => {
        jsonRequesterPostStub = sinon.stub(jsonRequester, 'post');
        cryptoJSStub = sinon.stub(CryptoJS, 'SHA1')
          .returns(passHash);
      });
      afterEach(() => {
        jsonRequesterPostStub.restore();
        cryptoJSStub.restore();
      });

      it('expect register to make a POST request', (done) => {
        const user = {
          username: 'testuser',
          password: '123456'
        };

        const response = {
          result: {
            username: user.username,
            authKey: 'SOME_AUTH_KEY'
          }
        }

        jsonRequesterPostStub.returns(Promise.resolve(response));

        data.users.register(user)
          .then(() => {
            expect(jsonRequesterPostStub).to.have.been.calledOnce;
          })
          .then(done, done);
      });

      it('expect register to make a POST request to api/users', (done) => {
        const user = {
          username: 'testuser',
          password: '123456'
        };

        const response = {
          result: {
            username: user.username,
            authKey: ''
          }
        }

        jsonRequesterPostStub.returns(Promise.resolve(response));

        data.users.register(user)
          .then(() => {
            expect(jsonRequesterPostStub).to.have.been.calledWith('api/users');
          })
          .then(done, done);
      });

      it('expect register to make a POST request with user data (username)', (done) => {
        const user = {
          username: 'testuser',
          password: '123456'
        };

        const response = {
          result: {
            username: user.username,
            authKey: 'SOME_AUTH_KEY'
          }
        };

        jsonRequesterPostStub.returns(Promise.resolve(response));

        data.users.register(user)
          .then(() => {
            const expected = {
              data: {
                username: user.username
              }
            };
            expect(jsonRequesterPostStub.args[0][1].data.username).to.equal(user.username);
          })
          .then(done, done);
      });

      it('expect register to make a call to CryptoJS.SHA1() once', (done) => {
        const user = {
          username: 'testuser',
          password: '123456'
        };

        const response = {
          result: {
            username: user.username,
            authKey: 'SOME_AUTH_KEY'
          }
        };

        jsonRequesterPostStub.returns(Promise.resolve(response));

        data.users.register(user)
          .then(() => {
            expect(cryptoJSStub).to.have.been.calledOnce;
          })
          .then(done, done);
      });

      it('expect register to make a call to CryptoJS.SHA1() with correct params', (done) => {
        const user = {
          username: 'testuser',
          password: '123456'
        };

        const response = {
          result: {
            username: user.username,
            authKey: 'SOME_AUTH_KEY'
          }
        };

        jsonRequesterPostStub.returns(Promise.resolve(response));

        data.users.register(user)
          .then(() => {
            expect(cryptoJSStub).to.have.been.calledWith(user.username + user.password);
          })
          .then(done, done);
      });

      it('expect register to make a POST request with user data (passHash)', (done) => {
        const user = {
          username: 'testuser',
          password: '123456'
        };

        const response = {
          result: {
            username: user.username,
            authKey: 'SOME_AUTH_KEY'
          }
        };

        jsonRequesterPostStub.returns(Promise.resolve(response));

        data.users.register(user)
          .then(() => {
            const expected = {
              data: {
                username: user.username
              }
            };
            expect(jsonRequesterPostStub.args[0][1].data.passHash).to.equal(passHash);
          })
          .then(done, done);
      });

      it('expect username to be set in localStorage', (done) => {
        const user = {
          username: 'testuser',
          password: '123456'
        };

        const response = {
          result: {
            username: user.username,
            authKey: 'SOME_AUTH_KEY'
          }
        };

        jsonRequesterPostStub.returns(Promise.resolve(response));

        data.users.register(user)
          .then(() => {
            expect(localStorage.getItem('signed-in-user-username')).to.equal(user.username);
          })
          .then(done, done);
      });

      it('expect authKey to be set in localStorage', (done) => {
        const user = {
          username: 'testuser',
          password: '123456'
        };

        const response = {
          result: {
            username: user.username,
            authKey: 'SOME_AUTH_KEY'
          }
        };

        jsonRequesterPostStub.returns(Promise.resolve(response));

        data.users.register(user)
          .then(() => {
            expect(localStorage.getItem('signed-in-user-auth-key')).to.equal(response.result.authKey);
          })
          .then(done, done);
      });

      it('expect register function to return a Promise', () => {
        const user = {
          username: 'testuser',
          password: '123456'
        };

        const response = {
          result: {
            username: user.username,
            authKey: 'SOME_AUTH_KEY'
          }
        };

        jsonRequesterPostStub.returns(Promise.resolve(response));

        const promise = data.users.register(user);
        expect(promise).to.be.an.instanceof(Promise);
      });

      it('expect register function to return a Promise which resolves with registered username', (done) => {
        const user = {
          username: 'testuser',
          password: '123456'
        };

        const response = {
          result: {
            username: user.username,
            authKey: 'SOME_AUTH_KEY'
          }
        };

        jsonRequesterPostStub.returns(Promise.resolve(response));

        data.users.register(user)
          .then((value) => {
            const expected = {
              username: user.username
            };

            expect(value).to.deep.equal(expected);
          })
          .then(done, done);
      });
    });

    describe('Login tests', () => {
      let jsonRequesterPutStub;
      let cryptoJSStub;
      const passHash = 'SOME_PASS_HASH';

      beforeEach(() => {
        jsonRequesterPutStub = sinon.stub(jsonRequester, 'put');
        cryptoJSStub = sinon.stub(CryptoJS, 'SHA1')
          .returns(passHash);
      });
      afterEach(() => {
        jsonRequesterPutStub.restore();
        cryptoJSStub.restore();
      });

      it('expect login to make a PUT request', (done) => {
        const user = {
          username: 'testuser',
          password: '123456'
        };

        const response = {
          result: {
            username: user.username,
            authKey: 'SOME_AUTH_KEY'
          }
        }

        jsonRequesterPutStub.returns(Promise.resolve(response));

        data.users.signIn(user)
          .then(() => {
            expect(jsonRequesterPutStub).to.have.been.calledOnce;
          })
          .then(done, done);
      });

      it('expect login to make a PUT request to api/users/auth', (done) => {
        const user = {
          username: 'testuser',
          password: '123456'
        };

        const response = {
          result: {
            username: user.username,
            authKey: ''
          }
        }

        jsonRequesterPutStub.returns(Promise.resolve(response));

        data.users.signIn(user)
          .then(() => {
            expect(jsonRequesterPutStub).to.have.been.calledWith('api/users/auth');
          })
          .then(done, done);
      });

      it('expect login to make a PUT request with user data (username)', (done) => {
        const user = {
          username: 'testuser',
          password: '123456'
        };

        const response = {
          result: {
            username: user.username,
            authKey: 'SOME_AUTH_KEY'
          }
        };

        jsonRequesterPutStub.returns(Promise.resolve(response));

        data.users.signIn(user)
          .then(() => {
            const expected = {
              data: {
                username: user.username
              }
            };
            expect(jsonRequesterPutStub.args[0][1].data.username).to.equal(user.username);
          })
          .then(done, done);
      });

      it('expect login to make a call to CryptoJS.SHA1() once', (done) => {
        const user = {
          username: 'testuser',
          password: '123456'
        };

        const response = {
          result: {
            username: user.username,
            authKey: 'SOME_AUTH_KEY'
          }
        };

        jsonRequesterPutStub.returns(Promise.resolve(response));

        data.users.signIn(user)
          .then(() => {
            expect(cryptoJSStub).to.have.been.calledOnce;
          })
          .then(done, done);
      });

      it('expect login to make a call to CryptoJS.SHA1() with correct params', (done) => {
        const user = {
          username: 'testuser',
          password: '123456'
        };

        const response = {
          result: {
            username: user.username,
            authKey: 'SOME_AUTH_KEY'
          }
        };

        jsonRequesterPutStub.returns(Promise.resolve(response));

        data.users.signIn(user)
          .then(() => {
            expect(cryptoJSStub).to.have.been.calledWith(user.username + user.password);
          })
          .then(done, done);
      });

      it('expect login to make a POST request with user data (passHash)', (done) => {
        const user = {
          username: 'testuser',
          password: '123456'
        };

        const response = {
          result: {
            username: user.username,
            authKey: 'SOME_AUTH_KEY'
          }
        };

        jsonRequesterPutStub.returns(Promise.resolve(response));

        data.users.signIn(user)
          .then(() => {
            const expected = {
              data: {
                username: user.username
              }
            };
            expect(jsonRequesterPutStub.args[0][1].data.passHash).to.equal(passHash);
          })
          .then(done, done);
      });

      it('expect username to be set in localStorage', (done) => {
        const user = {
          username: 'testuser',
          password: '123456'
        };

        const response = {
          result: {
            username: user.username,
            authKey: 'SOME_AUTH_KEY'
          }
        };

        jsonRequesterPutStub.returns(Promise.resolve(response));

        data.users.signIn(user)
          .then(() => {
            expect(localStorage.getItem('signed-in-user-username')).to.equal(user.username);
          })
          .then(done, done);
      });

      it('expect authKey to be set in localStorage', (done) => {
        const user = {
          username: 'testuser',
          password: '123456'
        };

        const response = {
          result: {
            username: user.username,
            authKey: 'SOME_AUTH_KEY'
          }
        };

        jsonRequesterPutStub.returns(Promise.resolve(response));

        data.users.signIn(user)
          .then(() => {
            expect(localStorage.getItem('signed-in-user-auth-key')).to.equal(response.result.authKey);
          })
          .then(done, done);
      });

      it('expect login function to return a Promise', () => {
        const user = {
          username: 'testuser',
          password: '123456'
        };

        const response = {
          result: {
            username: user.username,
            authKey: 'SOME_AUTH_KEY'
          }
        };

        jsonRequesterPutStub.returns(Promise.resolve(response));

        const promise = data.users.signIn(user);
        expect(promise).to.be.an.instanceof(Promise);
      });

      it('expect login function to return a Promise which resolves with registered username', (done) => {
        const user = {
          username: 'testuser',
          password: '123456'
        };

        const response = {
          result: {
            username: user.username,
            authKey: 'SOME_AUTH_KEY'
          }
        };

        jsonRequesterPutStub.returns(Promise.resolve(response));

        data.users.signIn(user)
          .then((value) => {
            const expected = {
              username: user.username,
              authKey: response.result.authKey
            };

            expect(value).to.deep.equal(expected);
          })
          .then(done, done);
      });
    });

    describe('Logout tests', () => {
      it('expect username to be cleared from localStorage', (done) => {
        data.users.signOut()
          .then(expect(localStorage.getItem('signed-in-user-username')).to.be.null)
          .then(done, done);
      });

      it('expect authKey to be cleared from localStorage', (done) => {
        data.users.signOut()
          .then(expect(localStorage.getItem('signed-in-user-auth-key')).to.be.null)
          .then(done, done);
      });

      it('expect signOut function to return a Promise', () => {
        const promise = data.users.signOut();
        expect(promise).to.be.an.instanceof(Promise);
      });
    });

    describe('hasUser tests', () => {
      it('expect hasUser() to return false when no one is logged in', () => {
        expect(data.users.hasUser()).to.be.false;
      });
      it('expect hasUser() to return false when authKey is missing from localStorage', () => {
        localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, 'testuser');
        expect(data.users.hasUser()).to.be.false;
      });
      it('expect hasUser() to return false when username is missing from localStorage', () => {
        localStorage.setItem(LOCAL_STORAGE_AUTHKEY_KEY, 'ANOTHER_BLQ_AUTH_KEY');
        expect(data.users.hasUser()).to.be.false;
      });
      it('expect hasUser() to return true when both username and authKey are available in localStorage', () => {
        localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, 'testuser');
        localStorage.setItem(LOCAL_STORAGE_AUTHKEY_KEY, 'ANOTHER_BLQ_AUTH_KEY');
        expect(data.users.hasUser()).to.be.true;
      });
    });

    describe('getUsers tests', () => {
      let jsonRequesterGetStub;

      beforeEach(() => {
        jsonRequesterGetStub = sinon.stub(jsonRequester, 'get')
          .returns(Promise.resolve({result: 'ARRAY'}));
      });
      afterEach(() => {
        jsonRequesterGetStub.restore();
      });

      it('expect getUsers funtion to make a GET request', (done) => {
        data.users.get()
          .then(() => {
            expect(jsonRequesterGetStub).to.have.been.calledOnce;
          })
          .then(done, done);
      });

      it('expect getUsers funtion to make a GET request to api/users', (done) => {
        data.users.get()
          .then(() => {
            expect(jsonRequesterGetStub).to.have.been.calledWith('api/users');
          })
          .then(done, done);
      });

      it('expect getUsers funtion to return the users array', (done) => {
        data.users.get()
          .then((users) => {
            expect(users).to.equal('ARRAY');
          })
          .then(done, done);
      });

      it('expect getUsers funtion to return a Promise', () => {
        const promise = data.users.get();
        expect(promise).to.be.an.instanceof(Promise);
      });
    });
  });

  describe('Todos tests', () => {
    let jsonRequesterGetStub;

    beforeEach(() => {
      jsonRequesterGetStub = sinon.stub(jsonRequester, 'get')
        .returns(Promise.resolve({result: 'TODOS_WE_GET_IN_JSON'}));
    });
    afterEach(() => {
      jsonRequesterGetStub.restore();
    });

    it('expect getTodos function to return a Promise', () => {
      const promise = data.todos.get();
      expect(promise).to.be.an.instanceof(Promise);
    });

    it('expect getTodos function to make a GET request', (done) => {
      data.todos.get()
        .then(() => {
          expect(jsonRequesterGetStub).to.have.been.calledOnce;
        })
        .then(done, done);
    });
    it('expect getTodos function to make a GET request to api/todos', (done) => {
      data.todos.get()
        .then(() => {
          expect(jsonRequesterGetStub).to.have.been.calledWith('api/todos');
        })
        .then(done, done);
    });
    it('expect getTodos function to make a GET request to api/todos with authKey header', (done) => {
      const options = {
        headers: {
          ['x-auth-key']: 'WHATEVER_AUTH_KEY_SEEMS_VALID'
        }
      };

      localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, 'testuser');
      localStorage.setItem(LOCAL_STORAGE_AUTHKEY_KEY, options.headers['x-auth-key']);

      data.todos.get()
        .then(() => {
          expect(jsonRequesterGetStub.args[0][1]).to.deep.equal(options);
        })
        .then(done, done);
    });

    it('expect getTodos function to return todos', (done) => {
      data.todos.get()
        .then(todos => {
          expect(todos).to.equal('TODOS_WE_GET_IN_JSON');
        })
        .then(done, done);
    });
  });
});
