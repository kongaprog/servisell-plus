import { createClient } from '@supabase/supabase-js';
import { Product } from '../types';

// INSTRUCCIONES PARA EL USUARIO:
// 1. Ve a https://supabase.com/ y crea una cuenta gratuita.
// 2. Crea un nuevo proyecto.
// 3. En los ajustes del proyecto (Project Settings -> API), copia la "URL" y la "anon public key".
// 4. Pégalos en tu archivo .env.local como:
//    VITE_SUPABASE_URL=tu_url_aqui
//    VITE_SUPABASE_KEY=tu_clave_anon_aqui
// 5. En el editor SQL de Supabase, corre este comando para crear la tabla:
/*
   create table products (
     id text primary key,
     title text not null,
     brand text,
     deviceType text,
     partType text,
     condition text,
     pricePartOnly numeric,
     priceInstalled numeric,
     imageUrl text,
     inStock boolean default true,
     created_at timestamp with time zone default timezone('utc'::text, now())
   );
*/

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Only create the client if keys are present
export const supabase = (supabaseUrl && supabaseKey)
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export const getProductsFromSupabase = async (): Promise<Product[] | null> => {
    if (!supabase) return null;

    const { data, error } = await supabase
        .from('products')
        .select('*');

    if (error) {
        console.error('Error fetching from Supabase:', error);
        return null;
    }

    return data as Product[];
};
