pipeline {
    agent any

    stages {
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
