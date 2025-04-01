<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validācijas ziņu rindiņas
    |--------------------------------------------------------------------------
    |
    | Tālāk norādītās valodas rindiņas satur noklusējuma kļūdu ziņojumus, kurus 
    | izmanto validācijas klase. Daži no šiem noteikumiem satur vairākas versijas, 
    | piemēram, izmēru noteikumi. Jūtieties brīvi veikt izmaiņas šajās ziņās.
    |
    */

    'accepted' => ':attribute ir jābūt pieņemtam.',
    'accepted_if' => ':attribute ir jābūt pieņemtam, kad :other ir :value.',
    'active_url' => ':attribute ir jābūt derīgai URL.',
    'after' => ':attribute jābūt datumam pēc :date.',
    'after_or_equal' => ':attribute jābūt datumam pēc vai vienādam ar :date.',
    'alpha' => ':attribute drīkst saturēt tikai burtus.',
    'alpha_dash' => ':attribute drīkst saturēt tikai burtus, ciparus, domuzīmes un pasvītrojumus.',
    'alpha_num' => ':attribute drīkst saturēt tikai burtus un ciparus.',
    'array' => ':attribute jābūt masīvam.',
    'ascii' => ':attribute drīkst saturēt tikai vienbaita alfabētiskos simbolus un ciparus.',
    'before' => ':attribute jābūt datumam pirms :date.',
    'before_or_equal' => ':attribute jābūt datumam pirms vai vienādam ar :date.',
    'between' => [
        'array' => ':attribute jāsatur no :min līdz :max vienumiem.',
        'file' => ':attribute jābūt no :min līdz :max kilobaiti.',
        'numeric' => ':attribute jābūt starp :min un :max.',
        'string' => ':attribute jābūt no :min līdz :max rakstzīmēm.',
    ],
    'boolean' => ':attribute jābūt patiesam vai aplamam.',
    'can' => ':attribute satur neatļautu vērtību.',
    'confirmed' => ':attribute apstiprinājums nesakrīt.',
    'current_password' => 'Parole ir nepareiza.',
    'date' => ':attribute jābūt derīgam datumam.',
    'date_equals' => ':attribute jābūt datumam, kas vienāds ar :date.',
    'date_format' => ':attribute nesakrīt ar formātu :format.',
    'decimal' => ':attribute jābūt :decimal decimālzīmēm.',
    'declined' => ':attribute ir jānoraida.',
    'declined_if' => ':attribute jābūt noraidītam, ja :other ir :value.',
    'different' => ':attribute un :other jābūt atšķirīgiem.',
    'digits' => ':attribute jābūt :digits cipariem.',
    'digits_between' => ':attribute jābūt no :min līdz :max cipariem.',
    'dimensions' => ':attribute ir nederīgi attēla izmēri.',
    'distinct' => ':attribute satur dublētu vērtību.',
    'doesnt_end_with' => ':attribute nedrīkst beigties ar vienu no šādiem: :values.',
    'doesnt_start_with' => ':attribute nedrīkst sākties ar vienu no šādiem: :values.',
    'email' => ':attribute jābūt derīgai e-pasta adresei.',
    'ends_with' => ':attribute jābeidzas ar vienu no šādiem: :values.',
    'enum' => 'Izvēlētais :attribute ir nederīgs.',
    'exists' => 'Izvēlētais :attribute ir nederīgs.',
    'extensions' => ':attribute jābūt failam ar vienu no šīm paplašinājumiem: :values.',
    'file' => ':attribute jābūt failam.',
    'filled' => ':attribute jābūt vērtībai.',
    'gt' => [
        'array' => ':attribute jāsatur vairāk nekā :value vienumi.',
        'file' => ':attribute jābūt lielākam par :value kilobaiti.',
        'numeric' => ':attribute jābūt lielākam par :value.',
        'string' => ':attribute jābūt garākam par :value rakstzīmēm.',
    ],
    'gte' => [
        'array' => ':attribute jāsatur :value vai vairāk vienumi.',
        'file' => ':attribute jābūt lielākam vai vienādam ar :value kilobaiti.',
        'numeric' => ':attribute jābūt lielākam vai vienādam ar :value.',
        'string' => ':attribute jābūt garākam vai vienādam ar :value rakstzīmēm.',
    ],
    'hex_color' => ':attribute jābūt derīgai heksadecimālai krāsai.',
    'image' => ':attribute jābūt attēlam.',
    'in' => 'Izvēlētais :attribute ir nederīgs.',
    'in_array' => ':attribute laukam jābūt klātesošam :other.',
    'integer' => ':attribute jābūt veselam skaitlim.',
    'ip' => ':attribute jābūt derīgai IP adresei.',
    'ipv4' => ':attribute jābūt derīgai IPv4 adresei.',
    'ipv6' => ':attribute jābūt derīgai IPv6 adresei.',
    'json' => ':attribute jābūt derīgai JSON virknei.',
    'lowercase' => ':attribute jābūt mazajiem burtiem.',
    'lt' => [
        'array' => ':attribute jāsatur mazāk nekā :value vienumi.',
        'file' => ':attribute jābūt mazākam par :value kilobaiti.',
        'numeric' => ':attribute jābūt mazākam par :value.',
        'string' => ':attribute jābūt īsākam par :value rakstzīmēm.',
    ],
    'lte' => [
        'array' => ':attribute nedrīkst būt vairāk par :value vienumiem.',
        'file' => ':attribute jābūt mazākam vai vienādam ar :value kilobaiti.',
        'numeric' => ':attribute jābūt mazākam vai vienādam ar :value.',
        'string' => ':attribute jābūt īsākam vai vienādam ar :value rakstzīmēm.',
    ],
    'mac_address' => ':attribute jābūt derīgai MAC adresei.',
    'max' => [
        'array' => ':attribute nedrīkst saturēt vairāk par :max vienumiem.',
        'file' => ':attribute nedrīkst būt lielāks par :max kilobaiti.',
        'numeric' => ':attribute nedrīkst būt lielāks par :max.',
        'string' => ':attribute nedrīkst būt garāks par :max rakstzīmēm.',
    ],
    'max_digits' => ':attribute nedrīkst saturēt vairāk par :max cipariem.',
    'mimes' => ':attribute jābūt failam ar tipu: :values.',
    'mimetypes' => ':attribute jābūt failam ar tipu: :values.',
    'min' => [
        'array' => ':attribute jāsatur vismaz :min vienumi.',
        'file' => ':attribute jābūt vismaz :min kilobaiti.',
        'numeric' => ':attribute jābūt vismaz :min.',
        'string' => ':attribute rakstzīmēm jabūt vismaz :min',
    ],
    'min_digits' => ':attribute jāsatur vismaz :min cipari.',
    'missing' => ':attribute laukam ir jābūt trūkstam.',
    'missing_if' => ':attribute laukam ir jābūt trūkstam, kad :other ir :value.',
    'missing_unless' => ':attribute laukam ir jābūt trūkstam, ja vien :other nav :value.',
    'missing_with' => ':attribute laukam ir jābūt trūkstam, kad ir klāt :values.',
    'missing_with_all' => ':attribute laukam ir jābūt trūkstam, kad ir klāt :values.',
    'multiple_of' => ':attribute jābūt :value reizinājumam.',
    'not_in' => 'Izvēlētais :attribute ir nederīgs.',
    'not_regex' => ':attribute formāts ir nederīgs.',
    'numeric' => ':attribute jābūt skaitlim.',
    'password' => [
        'letters' => ':attribute jāiekļauj vismaz viena burts.',
        'mixed' => ':attribute jāiekļauj vismaz viens lielais un mazais burts.',
        'numbers' => ':attribute jāiekļauj vismaz viens cipars.',
        'symbols' => ':attribute jāiekļauj vismaz viens simbols.',
        'uncompromised' => 'Norādītā :attribute ir iekļauta datu noplūdē. Lūdzu, izvēlieties citu :attribute.',
    ],
    'present' => ':attribute jābūt klātesošam.',
    'prohibited' => ':attribute laukums ir aizliegts.',
    'prohibited_if' => ':attribute laukums ir aizliegts, kad :other ir :value.',
    'prohibited_unless' => ':attribute laukums ir aizliegts, ja vien :other nav :values.',
    'prohibits' => ':attribute neļauj :other klātbūtni.',
    'regex' => ':attribute formāts ir nederīgs.',
    'required' => ':attribute ir nepieciešams.',
    'required_array_keys' => ':attribute laukam jāsatur ieraksti priekš: :values.',
    'required_if' => ':attribute ir nepieciešams, kad :other ir :value.',
    'required_if_accepted' => ':attribute ir nepieciešams, kad :other ir pieņemts.',
    'required_unless' => ':attribute ir nepieciešams, ja vien :other nav :values.',
    'required_with' => ':attribute ir nepieciešams, kad ir klāt :values.',
    'required_with_all' => ':attribute ir nepieciešams, kad ir klāt :values.',
    'required_without' => ':attribute ir nepieciešams, kad nav klāt :values.',
    'required_without_all' => ':attribute ir nepieciešams, kad neviens no :values nav klāt.',
    'same' => ':attribute un :other ir jāsakrīt.',
    'size' => [
        'array' => ':attribute jāsatur :size vienumi.',
        'file' => ':attribute jābūt :size kilobaiti.',
        'numeric' => ':attribute jābūt :size.',
        'string' => ':attribute jābūt :size rakstzīmēm.',
    ],
    'starts_with' => ':attribute jāsākas ar vienu no šādiem: :values.',
    'string' => ':attribute jābūt virknei.',
    'timezone' => ':attribute jābūt derīgai laika zonai.',
    'ulid' => ':attribute jābūt derīgam ULID.',
    'unique' => ':attribute jau ir aizņemts.',
    'uploaded' => ':attribute neizdevās augšupielādēt.',
    'uppercase' => ':attribute jābūt lielajiem burtiem.',
    'url' => ':attribute jābūt derīgai URL.',
    'uuid' => ':attribute jābūt derīgam UUID.',

    /*
    |--------------------------------------------------------------------------
    | Pasūtītie validācijas ziņojumi
    |--------------------------------------------------------------------------
    |
    | Šeit jūs varat norādīt pasūtītos validācijas ziņojumus atribūtam, izmantojot 
    | noteikuma nosaukumu. Tas ļauj jums ātri noteikt specifisku ziņu kādam 
    | atribūtam.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'pasūtīta ziņa',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Pasūtīto atribūtu nosaukumi
    |--------------------------------------------------------------------------
    |
    | Tālāk norādītās valodas rindiņas izmanto, lai apmainītu atribūtu vietturus 
    | ar kaut ko vieglāk lasāmu, piemēram, "E-pasts" tā vietā, lai rādītu 
    | "email". Tas vienkārši palīdz mums padarīt ziņas skaidrākas.
    |
    */

    'attributes' => [
        'email' => "epasts",
        'password' => "parole",
        'name' => "lietotājvārds",
        'current_password' => "pašreizējā parole",
    ],

];

