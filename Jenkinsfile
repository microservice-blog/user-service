pipeline {
  agent {
    docker {
      image 'thaott084/node-docker-cli:2.0'
      args '-v /var/run/docker.sock:/var/run/docker.sock'
    }
  }

  environment {
    IMAGE_NAME = "thuctd281/user-service"
    ENV_FILE = "/root/env-app/.env"
  }

  stages {
    stage('Clone source') {
      steps {
        checkout scm
        sh 'ls -la'
      }
    }

    stage('Install deps') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Login to Docker Registry') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'thuctd-281', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
          sh '''
            echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
          '''
        }
      }
    }

    stage('Docker Build') {
      steps {
        script {
          def commit = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
          env.IMAGE_TAG = "${env.IMAGE_NAME}:build-${BUILD_NUMBER}-${commit}"
          sh 'docker build -t $IMAGE_TAG .'
        }
      }
    }

    stage('Docker Push') {
      steps {
        sh 'docker push $IMAGE_TAG'
      }
    }

    stage('Deploy using docker-compose') {
      agent {
        docker {
          image 'docker/compose:1.29.2'
          args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
      }

      steps {
        withCredentials([file(credentialsId: 'FILE_ENV', variable: 'ENV_FILE')]) {
          sh '''
            cp "$ENV_FILE" .env
            cat .env
            export SERVICE_IMAGE=$IMAGE_TAG
            docker-compose pull
            docker-compose down
            docker-compose up -d
          '''
        }
      }
    }
  }

  post {
    failure {
      echo '❌ Build failed'
    }
    success {
      echo '✅ Deploy thành công'
    }
  }
}
