 
'use strict';
const mongoose = require('mongoose')
const debug = require('debug')('gpgfs-model.project')

const BouncerModel = require('@dataparty/bouncer-model')
const Utils = BouncerModel.Utils


class Project extends BouncerModel.Model {

  static get Type () { return 'project' }

  static get Schema(){
    return {
      name: String,
      owner: [String],
      created: Utils.created,
      
      developers: [{
        name: String,
        email: [String],
        keygrip: [String],
        discord: [String],
        github: [String]
      }],
      
      teams: [{
        name: String,
        owner: [String],
        members: [String]
      }],
      
      packages: [{
        git: String,
        type: String,         //! {npm, ...}
        build: String,        //! Build steps to run before deploy
        secrets: [{
          secretPath: String, //! Path within cloud.cluster.service.pkg folder
          linkPath: String
        }],
        artifacts: [{
          name: String,
          path: String, //! Path of output files || serialized RegEx-instance
          regex: String //! serialized RegEx-instance to match output file
        }]
      }],

      services: [{
        name: String,
        packages: [{
          name: String,
        }]
      }],
      
      clouds: [{
        name: String,         //! gpgfs://cloud-${name}/
        type: String,         //! { local, google, lxc/maas/juju }
        team: String,
        apiKeyPath: String,   //! gpgfs://cloud-${name}/secrets/${apiKeyPath}
        services: [String]    //! gpgfs://cloud-${name}/services/${service[n]}/${service[n].package[m]}/config.json
      }]
      
    }
  }

}


module.exports = Project
