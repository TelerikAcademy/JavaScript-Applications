describe('Data layer tests', () => {
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
});
