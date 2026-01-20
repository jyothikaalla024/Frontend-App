pipeline {
    agent any
    tools {
        // Use the exact name you gave it in Global Tool Configuration
        nodejs 'NodeJS_20' 
    }
    stages {
        stage('Build Frontend') {
            steps {
                echo 'Building frontend...'
                sh 'npm install'
                sh 'npm run build'
            }
        }
    }
    environment {
        AWS_DEFAULT_REGION = 'us-east-1'
        S3_BUCKET = 'aws-devops-frontend'
        CLOUDFRONT_DISTRIBUTION_ID = 'E2KZLS3M92YREP'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/jyothikaalla024/Frontend-App.git'
            }
        }

        stage('Build Frontend') {
            steps {
                sh '''
                  chmod +x build.sh
                  ./build.sh
                '''
            }
        }

        stage('Deploy to S3 & Invalidate CloudFront') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-jenkins-creds'
                ]]) {
                    sh '''
                      aws s3 sync build/ s3://$S3_BUCKET --delete
                      aws cloudfront create-invalidation \
                        --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
                        --paths "/*"
                    '''
                }
            }
        }
    }
}
