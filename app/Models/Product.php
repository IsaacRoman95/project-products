<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'price', 'sub_group_id'];

    public function subGroup()
    {
        return $this->belongsTo(SubGroup::class);
    }
}
