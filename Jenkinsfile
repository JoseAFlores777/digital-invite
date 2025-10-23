pipeline {
  agent any
  options {
    timestamps()
    skipDefaultCheckout(true)   // ⬅️ evita el "Declarative: Checkout SCM" implícito
  }

  environment {
    CI_ENV_FILE_CREDENTIALS_ID = 'invite-joseiz-ci-env'
    DOCKERHUB_CREDENTIALS_ID   = 'dockerhub-creds'
    DOCKER_REGISTRY            = 'docker.io'

    // 🔔 Slack (Webhook). Crea una credencial "Secret text" con la URL del webhook y pon aquí su ID.
    // Si lo dejas vacío o no existe, el pipeline seguirá sin fallar.
    SLACK_WEBHOOK_CREDENTIAL_ID = 'slack-webhook'  // <-- cambia si tu ID es otro (o deja vacío para desactivar)
    SLACK_NOTIFY_BRANCH_ONLY    = 'main'           // Notifica solo esta rama (déjalo vacío para todas)
  }

  stages {
    stage('Clean') {
      steps {
        deleteDir() // ⬅️ limpia completamente el workspace (evita .git corrupto  )
      }
    }

    stage('Checkout') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: '*/main']], // ajusta si no es main
          userRemoteConfigs: [[
            url: 'https://github.com/JoseAFlores777/digital-invite.git',
            credentialsId: 'github-pat'
          ]],
          extensions: [
            [$class: 'WipeWorkspace'],  // seguridad extra
            [$class: 'CloneOption', shallow: false, depth: 0, noTags: false]
          ]
        ])
      }
    }

    stage('Imprimir nombre de la rama') { steps { echo "Rama actual: ${env.BRANCH_NAME}" } }

    stage('Cargar .env (Secret file)') {
      steps {
        withCredentials([file(credentialsId: env.CI_ENV_FILE_CREDENTIALS_ID, variable: 'CI_ENV_FILE')]) {
          sh '''
            set -eu
            if [ ! -s "$CI_ENV_FILE" ]; then
              echo "[ERROR] Secret file vacío o inexistente: $CI_ENV_FILE" >&2
              exit 1
            fi
            awk 'BEGIN{OFS="="} /^[[:space:]]*#/ || /^[[:space:]]*$/ {next} {
                 line=$0; pos=index(line, "="); if (pos==0) next
                 key=substr(line,1,pos-1); val=substr(line,pos+1)
                 sub(/^[[:space:]]+/, "", key); sub(/[[:space:]]+$/, "", key)
                 sub(/^[[:space:]]+/, "", val); sub(/[[:space:]]+$/, "", val)
                 print key, val
               }' "$CI_ENV_FILE" > .ci_env_sanitized
            echo "[OK] .env saneado a .ci_env_sanitized"
          '''
        }
      }
    }

    stage('Preparar metadatos de imagen') {
      steps {
        script {
          def props = readProperties file: '.ci_env_sanitized'
          def ns  = (props['DOCKERHUB_NAMESPACE']  ?: '').trim()
          def repo= (props['DOCKERHUB_REPOSITORY'] ?: '').trim()
          if (!ns || !repo) {
            error "Faltan DOCKERHUB_NAMESPACE / DOCKERHUB_REPOSITORY en el Secret file (.env)."
          }
          def registry  = (env.DOCKER_REGISTRY ?: 'docker.io').trim()
          def imageRepo = "${registry}/${ns}/${repo}"
          def tag       = env.GIT_COMMIT ? env.GIT_COMMIT.take(7) : (env.BUILD_NUMBER ?: 'latest')
          writeFile file: '.ci_runtime_env', text: "IMAGE_REPO=${imageRepo}\nIMAGE_TAG=${tag}\nDOCKER_REGISTRY=${registry}\n"
          echo "Imagen objetivo: ${imageRepo}:${tag}"
        }
      }
    }

    stage('Docker Build') {
      agent { docker { image 'docker:27.1.2-cli'; args '-v /var/run/docker.sock:/var/run/docker.sock'; reuseNode true } }
      steps {
        script {
          def files = ['.ci_env_sanitized', '.ci_runtime_env']
          def pairs = []
          files.each { f -> if (fileExists(f)) { readProperties(file: f).each { k,v -> pairs << "${k}=${v}" } } }
          withEnv(pairs) {
            def buildArgs = sh(script: '''env | awk -F= '/^NEXT_PUBLIC_/ {printf "--build-arg %s=%s ", $1, $2}' ''', returnStdout: true).trim()
            if (buildArgs) { echo "Pasando a docker build: ${buildArgs}" } else { echo "[INFO] No se detectaron variables NEXT_PUBLIC_*." }
            sh """
              set -eu
              docker build ${buildArgs} -t "${IMAGE_REPO}:${IMAGE_TAG}" -t "${IMAGE_REPO}:latest" .
            """
          }
        }
      }
    }

    stage('Push a Docker Hub (solo main)') {
      agent { docker { image 'docker:27.1.2-cli'; args '-v /var/run/docker.sock:/var/run/docker.sock'; reuseNode true } }
      when { branch 'main' }
      steps {
        script {
          def files = ['.ci_env_sanitized', '.ci_runtime_env']
          def pairs = []
          files.each { f -> if (fileExists(f)) { readProperties(file: f).each { k,v -> pairs << "${k}=${v}" } } }
          withEnv(pairs) {
            withCredentials([usernamePassword(credentialsId: env.DOCKERHUB_CREDENTIALS_ID, usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_TOKEN')]) {
              sh '''
                set -eu
                echo "$DOCKERHUB_TOKEN" | docker login "${DOCKER_REGISTRY}" -u "$DOCKERHUB_USERNAME" --password-stdin
                docker push "${IMAGE_REPO}:${IMAGE_TAG}"
                docker push "${IMAGE_REPO}:latest"
                docker logout || true
              '''
            }
          }
        }
      }
    }

    stage('Trigger redeploy en Dokploy') {
      when { branch 'main' }
      steps {
        withCredentials([string(credentialsId: 'INVITE_JOSEIZ_DOKPLOY_WEBHOOK_URL', variable: 'INVITE_JOSEIZ_DOKPLOY_WEBHOOK_URL')]) {
          sh '''
            set -eu
            echo "[INFO] Dokploy: redeploy con force=true y pull=true..."

            payload='{"force":true,"pull":true}'
            code=$(curl -sS -o /tmp/dokploy_resp.txt -w "%{http_code}" \
              -X POST "$INVITE_JOSEIZ_DOKPLOY_WEBHOOK_URL" \
              -H "Content-Type: application/json" \
              --data "$payload")

            echo "[INFO] Respuesta Dokploy (HTTP $code):"
            cat /tmp/dokploy_resp.txt || true

            if [ "$code" -lt 200 ] || [ "$code" -ge 300 ]; then
              echo "[ERROR] Dokploy devolvió HTTP $code" >&2
              exit 1
            fi
            echo "[OK] Redeploy (force+pull) solicitado correctamente."
          '''
        }
      }
    }
  }

  post {
    success {
      script {
        def p = fileExists('.ci_runtime_env') ? readProperties(file: '.ci_runtime_env') : [:]
        echo "✅ Éxito: ${p['IMAGE_REPO'] ?: 'repo?'}:${p['IMAGE_TAG'] ?: 'tag?'}"
      }
    }
    failure { echo "❌ Falló el pipeline" }

    // 🔔🔔🔔 Slack Notification (Webhook) — no rompe si no existe la credencial o si la rama no coincide
    always {
      script {
        // Notificar solo si coincide la rama (o si SLACK_NOTIFY_BRANCH_ONLY está vacío)
        def notifyBranch = (env.SLACK_NOTIFY_BRANCH_ONLY ?: '').trim()
        def branch = env.BRANCH_NAME ?: sh(script: 'git rev-parse --abbrev-ref HEAD || echo n/a', returnStdout: true).trim()
        if (notifyBranch && branch != notifyBranch) {
          echo "[SLACK] Skip notify: rama '${branch}' != '${notifyBranch}'"
          return
        }

        // Si no se configuró un ID de credencial, no intentamos notificar
        if (!env.SLACK_WEBHOOK_CREDENTIAL_ID?.trim()) {
          echo "[SLACK] Skip notify: SLACK_WEBHOOK_CREDENTIAL_ID vacío (configúralo en environment)"
          return
        }

        // Construimos mensaje
        def status = currentBuild.currentResult ?: 'SUCCESS'
        def color  = (status == 'SUCCESS') ? '#2eb886' : (status == 'UNSTABLE' ? '#daa038' : '#e01e5a')
        def commit = sh(script: 'git rev-parse --short HEAD || echo nocommit', returnStdout: true).trim()

        def text = "*${env.JOB_NAME}* #${env.BUILD_NUMBER} — *${status}*\n" +
                   "Branch: `${branch}`  Commit: `${commit}`\n" +
                   "<${env.BUILD_URL}|Ver build>"

        // Payload Slack (Incoming Webhook)
        def payloadObj = [
          attachments: [[
            color: color,
            mrkdwn_in: ['text', 'fields'],
            text: text,
            fields: [
              [title: 'Imagen', value: (fileExists('.ci_runtime_env') ? (readProperties(file: '.ci_runtime_env')['IMAGE_REPO'] ?: 'N/A') : 'N/A'), short: true],
              [title: 'Tag',    value: (fileExists('.ci_runtime_env') ? (readProperties(file: '.ci_runtime_env')['IMAGE_TAG']  ?: 'N/A') : 'N/A'), short: true],
            ],
            footer: "Jenkins • ${new Date().format('yyyy-MM-dd HH:mm:ss')}"
          ]]
        ]
        def payloadJson = groovy.json.JsonOutput.toJson(payloadObj)
        // Escape para comillas simples
        def payloadEsc = payloadJson.replace("'", "'\\''")

        try {
          withCredentials([string(credentialsId: env.SLACK_WEBHOOK_CREDENTIAL_ID, variable: 'SLACK_WEBHOOK_URL')]) {
            // Evitar interpolación Groovy: payload y webhook via ENV + sh con comillas simples
            withEnv(["SLACK_PAYLOAD=${payloadEsc}"]) {
              sh '''#!/bin/bash
set -eu
curl -sS -X POST -H 'Content-type: application/json' \
  --data "$SLACK_PAYLOAD" "$SLACK_WEBHOOK_URL" >/dev/null || true
'''
            }
            echo "[SLACK] Notificado por webhook."
          }
        } catch (e) {
          echo "[SLACK] No se pudo notificar (¿credencial '${env.SLACK_WEBHOOK_CREDENTIAL_ID}' inexistente?): ${e}"
        }
      }
    }
  }
}