interface OAuthClient {
    client_id: string,
    redirect_uri: string,
    scope: string
    audience?: string
    code_challenge?: string
    code_challenge_method?: string
}