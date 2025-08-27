@Library('jenkins-shared-lib') _

  def working_directory = 'dagility-ui-kit'

  properties([
    buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '10')),
    parameters([
        booleanParam(name: 'build', defaultValue: true, description: ''),
        booleanParam(name: 'test', defaultValue: true, description: ''),
        booleanParam(name: 'publish', defaultValue: true, description: ''),
        string(defaultValue: 'dagility-ui-kit', description: '', name: 'working_directory')
    ])
  ])

  DagilityCINPMLibraryPipeline(build: "${build}", working_directory: "${working_directory}")
