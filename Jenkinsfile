pipeline {
    agent any

    stages {
        stage('Prepare') {
          steps {
            sh 'npm install'
          }
        }
        stage('Build') {
            steps {
                sh 'yarn compile'
            }
        }
        stage('Test') {
            steps {
                sh 'yarn test'
            }
        }
    }

    post {
      always {
        echo 'Finished testing project.'
      }
    }
}
