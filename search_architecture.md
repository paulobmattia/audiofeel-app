# Arquitetura de Pesquisa Atual (AudioFeel)

Este documento detalha o funcionamento técnico do motor de busca do AudioFeel, incluindo fontes de dados, lógica de prioridade e limitações atuais.

## 1. Fluxo de Pesquisa (Visão Geral)
O processo segue uma ordem linear de tentativa e erro, da estratégia mais específica para a mais genérica.

1.  **Parser de Entrada**: O termo digitado é normalizado (minúsculas, sem acentos para chaves internas).
2.  **Detecção de Tipo**: O sistema tenta adivinhar se é `filme`, `livro`, `sentimento` ou `conceito` (ex: "triste", "azul", "duna").
3.  **Estratégia de Descoberta (O "Cérebro")**:
    *   **Nível 1 (Curadoria Interna)**: Verifica se o termo está na lista VIP (`KNOWN_BOOKS` / `KNOWN_MOVIES`).
    *   **Nível 2 (Descoberta Otimista)**: Consulta APIs externas (TMDB, Open Library) em tempo real para validar se é uma obra famosa.
    *   **Nível 3 (Mapeamento Genérico)**: Se não for obra específica, traduz o conceito para gêneros musicais (via `tagMap.js`).
4.  **Enriquecimento Musical**: Com as tags em mãos (ex: `soundtrack`, `score`, `jazz`, `ambient`), consulta a API do Last.fm.
5.  **Scoring e Resultado**: Calcula a relevância (0-100%) e exibe músicas e playlists.

---

## 2. Fontes de Dados (Databases)

O sistema consulta três fontes principais, nesta ordem de prioridade:

| Fonte | Tipo de Dado | Função | Exemplo de Uso |
| :--- | :--- | :--- | :--- |
| **Local (Internal DB)** | Curadoria Manual | Garantir títulos em PT-BR e tags perfeitas para clássicos. | *Crime e Castigo*, *Duna*, *Interestelar*. |
| **TMDB (The Movie DB)** | Filmes Globais | Validar se um termo desconhecido é um filme popular. Traz capa e gêneros. | *Titanic*, *Vingadores*, *Oppenheimer*. |
| **Open Library** | Livros Globais | Validar se é um livro. Traz autor e data. | *Mar Inquieto*, *Dom Casmurro*. |
| **Last.fm** | Música | Encontrar faixas, artistas e álbuns baseados nas tags geradas. | *Hans Zimmer*, *Radiohead*, *Jazz*. |

---

## 3. Lógica Detalhada e Prioridades

### Nível 1: Curadoria Interna (Highest Priority)
*   **Como funciona**: Uma lista `key-value` no código (`src/engine/bookDb.js` e `movieDb.js`).
*   **Vantagem**: Controle total. Garante que "1984" traga músicas distópicas e não pop dos anos 80.
*   **Limitação**: Precisa ser atualizada manualmente.

### Nível 2: Descoberta Otimista (Dynamic api)
*   **Como funciona**: Se o termo não estiver na lista interna, o sistema pergunta às APIs externas:
    *   *"Ei TMDB, 'Titanic' é um filme famoso?"*
    *   *"Ei Open Library, 'O Código Da Vinci' é um livro?"*
*   **Regra de Aceite (Threshold)**:
    *   **Filme**: Deve ter Popularidade > 20 (ou Vote Count > 100) E Título Exato.
    *   **Livro**: Deve ter Nº de Edições > 8 E Título começando com o termo.
*   **Prioridade**: Se ambos retornarem positivo, o sistema tende a escolher **Filme** (pois filmes têm trilhas sonoras mais diretas: `Score`, `Soundtrack`).

### Nível 3: Mapeamento Genérico (Fallback)
*   **Como funciona**: Se não for filme nem livro famoso, assume-se que é um sentimento ou cor.
*   **Tabela de Tradução (`tagMap.js`)**:
    *   "Triste" -> `sad`, `melancholy`, `ballad`.
    *   "Azul" -> `blues`, `jazz`, `cool`.
    *   "Dúvida" -> `mysterious`, `jazz`, `experimental`.
*   **Limitação**: É subjetivo e estático.

---

## 4. O Caso "Mar Inquieto" (Análise de Falha)

Por que a busca falhou ou trouxe resultados ruins?

1.  **Busca: "Mar Inquieto"**:
    *   O sistema foi à Open Library.
    *   Encontrou um registro com título exato "Mar Inquieto" mas **sem autor** (edição fantasma/mal cadastrada).
    *   Resultado: Livro existe, mas metadados pobres ("Unknown").

2.  **Busca: "Mar Inquieto Yukio Mishima"**:
    *   O sistema enviou a string inteira à Open Library.
    *   Muito provavelmente, a Open Library indexa o livro de Mishima pelo título em inglês (*The Sound of Waves*) ou o título original japonês (*Shiosai*).
    *   Não houve "Match Exato" de título começando com "Mar Inquieto Yukio Mishima".
    *   **Falha no Nível 2** -> Caiu para o Nível 3 (Genérico) ou retornou nada relevante.

### Diagnóstico
A busca por livros depende muito da **correspondência exata do título** na base de dados (Open Library). Títulos traduzidos variam muito de edição para edição.

---

## 5. Próximos Passos (Ideias para Melhoria)

Para evoluir a pesquisa, sugerimos:

1.  **Busca Fuzzy / Flexível**: Permitir que a busca encontre resultados aproximados ou por palavras-chave (não apenas "começa com").
2.  **API de Livros Melhor**: Migrar da Open Library (dados públicos/sujos) para **Google Books API** (dados comerciais/mais limpos).
3.  **LLM on the Fly (IA)**: Usar uma pequena IA (como Gemini Flash) para interpretar a intenção antes de buscar. Ex:
    *   *User*: "Aquele livro do navio que naufraga"
    *   *IA*: "Titanic (Filme) ou A Night to Remember (Livro)?" -> Busca as tags corretas.
4.  **Feedback Loop**: Se o usuário refinar a busca (ex: adicionar autor), o sistema deve entender que é um refinamento e buscar especificamente pelo campo Autor.

