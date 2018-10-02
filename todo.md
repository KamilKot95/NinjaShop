# TESTY
- endpointy działają poprawnie
    - order product:
        > when ordering a product API should create a new Order entry,
        send an email to a client's email address after placing an order (with text like: "Hello            AwesomeNinja7! You have bought a Shuriken for 4.99 ninjollars.", username, product name and         price should be dynamically set based on the item ordered).
- endpointy zwracają dobre błędy

### REFACTORING

### SZYBKIE
- kolekcja postmanowa

### DODATKOWE
- ważność tokenu
- async bcrypt
- Additional tasks
  > every morning at 8:00CEST send an email to the Admin's email with statistics:
  which product was selling the best yesterday,
  number of sold products,
  how much money was gained,
  the report should be sent as an attachment in PDF format.
- endpoints should be tagged as requiring authorization by decorator
    - e.g products should be available for not logged user
