pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Instalar Dependencias') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Ejecutar Pruebas') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Construir Imagen Docker') {
            steps {
                sh 'docker build -t dog-breeds-backend:${BUILD_NUMBER} .'
                sh 'docker tag dog-breeds-backend:${BUILD_NUMBER} localhost:5000/dog-breeds-backend:${BUILD_NUMBER}'
                sh 'docker tag dog-breeds-backend:${BUILD_NUMBER} localhost:5000/dog-breeds-backend:latest'
            }
        }
        
        stage('Subir al Registro') {
            steps {
                sh 'docker push localhost:5000/dog-breeds-backend:${BUILD_NUMBER}'
                sh 'docker push localhost:5000/dog-breeds-backend:latest'
            }
        }
        
        stage('Desplegar en QA') {
            when {
                branch 'develop'
            }
            steps {
                sh 'kubectl apply -f k8s/qa-deployment.yaml'
                sh 'kubectl set image deployment/backend-qa backend=localhost:5000/dog-breeds-backend:${BUILD_NUMBER} -n qa'
            }
        }
        
        stage('Desplegar en Producción') {
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
