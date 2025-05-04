pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t dog-breeds-backend:${BUILD_NUMBER} .'
                sh 'docker tag dog-breeds-backend:${BUILD_NUMBER} localhost:5000/dog-breeds-backend:${BUILD_NUMBER}'
                sh 'docker tag dog-breeds-backend:${BUILD_NUMBER} localhost:5000/dog-breeds-backend:latest'
            }
        }
        
        stage('Push to Registry') {
            steps {
                sh 'docker push localhost:5000/dog-breeds-backend:${BUILD_NUMBER}'
                sh 'docker push localhost:5000/dog-breeds-backend:latest'
            }
        }
        
        stage('Deploy to QA') {
            when {
                branch 'develop'
            }
            steps {
                sh 'kubectl apply -f k8s/qa-deployment.yaml'
                sh 'kubectl set image deployment/backend-qa backend=localhost:5000/dog-breeds-backend:${BUILD_NUMBER} -n qa'
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                sh 'kubectl apply -f k8s/prod-deployment.yaml'
                sh 'kubectl set image deployment/backend-prod backend=localhost:5000/dog-breeds-backend:${BUILD_NUMBER} -n production'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}